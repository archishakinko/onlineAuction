const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);

module.exports = ()=>{
    return {
        addProduct: addProduct
    }

    function addProduct (req, res){
        return new Promise((resolve, reject) => {
            dbcontext.product.create({
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            startPrice: req.body.price
        }).then((newProduct) => {
            resolve({success: true, data: newProduct});
            });
        });
    
    }
}
