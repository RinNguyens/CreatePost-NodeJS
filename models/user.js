const Sequelize = require('sequelize');

const database = require('./database');

const User = database.define('User',{
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true,
    },
    displayName : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    
});

module.exports = User;