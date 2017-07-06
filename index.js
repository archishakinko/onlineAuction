const express = require('express');
const config = require('./config');
const Sequelize = require('sequelize');
const promise = require('bluebird');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const easyxml = require('easyxml');
const session = require('express-session');  

const saltRounds = 10;
const dbcontext = require('./context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);


var app = express();
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

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

 dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(app.get('port'), () => console.log('Running on http://localhost'));
    })
    .catch((err) => console.log(err));