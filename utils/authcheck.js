const bcrypt = require('bcryptjs');
const out = require('./out');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const date = require('date-and-time');

exports.auth = function(req, res, dbcontext){
    dbcontext.user.findOne({
        where: { email: req.body.email}
    }).then((user) => {
        if(!user){
            out.send(req, res, {success: false, message: 'User not found.'}, 422);
        } else if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(result){
                    var token = jwt.sign(user.get({plain: true}), 'superSecret', {expiresIn: 7200});
                    res.cookie('token', token);
                    if(user.role==1){
                        out.send(req, res, {
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        role: 'admin'
                        },200);
                    }else {
                        out.send(req, res, {
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        role: 'user'
                        },200);
                    }
                    
                } else {
                    out.send(req, res, {success:false,message: 'Wrong password.'}, 422);
                }
            });
        }
    });
}

exports.register = function(req, res, next, dbcontext){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        if(err){
            throw err;
        }
        dbcontext.user.findOne({
            where:{
                email: req.body.email
            }
        }).then((oldUser) => {
            if(oldUser){
                out.send(req, res, { success: false, message: 'Registration failed. Login is not unique.' }, 233);
            }else if(!oldUser){
                dbcontext.user.create({
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    surname: req.body.surname,
                    phone: req.body.phone,
                    role: 2,
                    balance: 1000
                }).then((user) => {
                    var token = jwt.sign(user.get({plain: true}), 'superSecret', { expiresIn: 7200 });
                            res.cookie('token', token);
                            out.send(req, res, {success: true, message: 'User created', email: req.body.email}, 200);
                })
            }
        });
    });
}

exports.saveUserLocal = function(req,res,next){
    var token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'superSecret', function(err, decoded){
            if(!err){
                res.locals.user = decoded;
            }
            next();
        });
    } else
        next();
}

exports.tokenVerify = function(req, res, next){
    if (!res.locals.user)
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    next();
}

exports.isAuth = function(req,res,next){
    if (!res.locals.user)
        return res.render("error", {
            message: 'No token provided'
        });
    next();
}

exports.getActiveBid = function (dbcontext){
    return new Promise((resolve, reject) => {
        dbcontext.bid.max('createdAt').then((max) => {
            var now = new Date();
            var last = new Date(max);
            var lastplus = date.addSeconds(last, 59);
            if(now>last && now< lastplus){
                dbcontext.bid.findOne({
                    where: {createdAt: max}
                }).then((bid)=>{
                   dbcontext.product.findOne({
                    where: {
                        id: bid.productId
                    },
                    include:[{
                        all: true,
                        nested: true,
                        required: false
                        }]
                   }).then((product) => {
                       var price1 = product.productuser[0].bid.price > product.productuser[product.productuser.length-1].bid.price ? product.productuser[0].bid.price :  product.productuser[product.productuser.length-1].bid.price;
                       resolve({success:true, data: product, price: price1 });
                   })
                });
            }
        });
    });  
}

exports.makeBid = function (userId, productId, qprice, dbcontext){
    return new Promise((resolve, reject) => {
        dbcontext.user.findOne({
            where:{
                id:userId
            }
        }).then((user)=>{
            user.addUserproduct(productId, {price: qprice, duration: 60})
            .then((newBid) => {
                dbcontext.product.findOne({
                    where: {
                        id: productId 
                    },
                    include:[{
                        all: true,
                        nested: true,
                        required: false
                    }]
                }).then((product) => {
                    var price1 = product.productuser[0].bid.price > product.productuser[product.productuser.length-1].bid.price ? product.productuser[0].bid.price :  product.productuser[product.productuser.length-1].bid.price;
                    resolve({success:true, data: product, price: price1 });
                });  
            });
        });
    });
}