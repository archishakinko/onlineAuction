const express = require('express');
const config = require('./config');
const Sequelize = require('sequelize');
const promise = require('bluebird');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const easyxml = require('easyxml');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const out = require('./utils/out');
const auth = require('./utils/authcheck');  

const saltRounds = 10;
const dbcontext = require('./context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);


var app = express();
global.expressWs = require('express-ws')(app);
expressWs.broadcast =  (data) => {
  expressWs.getWss('/').clients.forEach(function each(client) {
      client.send(data);
  });
};
app.set('port',(process.env.PORT || 80));
var router = express.Router();

app.use(express.static('./public/'));
app.use(express.static('./client/dist/'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml({xmlParseOptions:{explicitArray: false}}));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(out.typeOf);

const adminService = require('./servicies/adminService')();
const userService = require('./servicies/userService')();
const authRoutes = require('./routes/auth');

app.ws('/:token',(ws, req)=>{
    jwt.verify(req.params.token, 'superSecret', function(err, decoded){
        if(!err){
            ws.user = decoded;
            auth.getActiveBid(dbcontext).then((bid) => {
                if(bid){
                    bid.data.dataValues.price = bid.data.dataValues.productuser[0].bid.price > bid.data.dataValues.productuser[bid.data.dataValues.productuser.length-1].bid.price ? bid.data.dataValues.productuser[0].bid.price : bid.data.dataValues.productuser[bid.data.dataValues.productuser.length-1].bid.price;
                    ws.send(JSON.stringify(bid.data));
                }
            });   
        } 
    });
    ws.on('message', function(msg){
        var val = parseInt(msg);
        auth.getActiveBid(dbcontext).then((bid) => {
            var price = bid.data.dataValues.productuser[0].bid.price > bid.data.dataValues.productuser[bid.data.dataValues.productuser.length-1].bid.price ? bid.data.dataValues.productuser[0].bid.price : bid.data.dataValues.productuser[bid.data.dataValues.productuser.length-1].bid.price;
            var productId = bid.data.dataValues.productuser[0].bid.productId > bid.data.dataValues.productuser[bid.data.dataValues.productuser.length-1].bid.productId ? bid.data.dataValues.productuser[0].bid.productId : bid.data.dataValues.productuser[bid.data.dataValues.productuser.length-1].bid.productId;
            var newPrice = parseInt(price+(price/100)*val);
            var userId = ws.user.id;

            auth.makeBid(userId, productId, newPrice, dbcontext).then((bid) => {
                bid.data.dataValues.price = bid.price;
                expressWs.broadcast(JSON.stringify(bid.data));
            })
        });      
    })
});

app.use('/auth', authRoutes);
app.use(auth.saveUserLocal);

const apiRoutes = require('./routes/api')(adminService, userService);
app.use('/api', auth.tokenVerify, apiRoutes);

 dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(app.get('port'), () => console.log('Running on http://localhost'));
    })
    .catch((err) => console.log(err));