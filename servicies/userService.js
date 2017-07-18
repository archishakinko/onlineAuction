const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);

module.exports = ()=>{
    return {
        getUser: getUser
    }

    function getUser (req, res){
        return new Promise((resolve, reject) => {
           dbcontext.user.findOne({
               where:{
                   id:res.locals.user.id
               }
           }).then((user)=>{
               resolve({success:true, data: user});
           });
        });
    };
};
   