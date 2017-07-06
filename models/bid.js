module.exports = (Sequelize, sequelize) => {
    return sequelize.define('bid', {
        price: Sequelize.INTEGER
    });    
};