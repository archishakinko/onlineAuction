const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);

module.exports = () => {
    return {
        addProduct: addProduct
    }

    function addProduct (req, res){
        return new Promise((resolve, reject) => {
            dbcontext.product.create({
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            startPrice: parseInt(req.body.startPrice)
        }).then((newProduct) => {
            createBid(newProduct, res.locals.user.id);
            resolve({success: true, data: newProduct});
            });
        });
    };

    function createBid(product, user){
        product.addProductuser(user, {price: product.startPrice, duration: 60});
    };

    function makeBid(product, user, bid){
        product.addProductuser(user, {price: bid, duration: 60});
    };


};
