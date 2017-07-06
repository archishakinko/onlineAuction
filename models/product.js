module.exports = (Sequelize, sequelize) => {
    return sequelize.define('product', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        img: Sequelize.STRING,
        startPrice: Sequelize.INTEGER
    });    
};