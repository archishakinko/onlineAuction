module.exports = (Sequelize, sequelize) => {
    return sequelize.define('user', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        role: Sequelize.INTEGER,
        balance: Sequelize.INTEGER,
        password: Sequelize.STRING
    });    
};