module.exports = (Sequelize, config) => {
    const options = {
        host: config.host,
        dialect: config.dialect,
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: { $eq: null }
                }
            }
        }
    };

    const sequelize = new Sequelize(config.name, config.user, config.password, options); 
    const User = require('../models/user')(Sequelize, sequelize);
    const Product = require('../models/product')(Sequelize, sequelize);
    const Bid = require('../models/bid')(Sequelize, sequelize);
    const Winner = require('../models/winner')(Sequelize, sequelize);

    User.belongsToMany(Product, {as: 'userproduct', through: Bid, timestamps: true, foreignKey: 'userId'});
    Product.belongsToMany(User, {as: 'productuser', through: Bid, timestamps: true, foreignKey: 'productId'});

    User.belongsToMany(Product, {as: 'userwinner', through: Winner, timestamps: true, foreignKey: 'userId'});
    Product.belongsToMany(User, {as: 'productwinner', through: Winner, timestamps: true, foreignKey: 'productId'});

     return {
        user: User,
        product: Product,
        bid: Bid,
        winner: Winner,
        sequelize: sequelize
    };
};