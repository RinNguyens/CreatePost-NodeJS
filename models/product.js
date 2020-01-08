const Sequelize = require('sequelize');
const database = require('./database');

const Product  = database.define('Product',{
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    image : {
        type : Sequelize.STRING,
        allowNull : false
    },
    price : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    mota : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

module.exports = Product;