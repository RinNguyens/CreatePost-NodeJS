const Sequelize = require("sequelize");
const database = require("./database");
const User = require('./user');
const Todo = database.define('Todo',{
    //Attribute
    task : {
        type : Sequelize.STRING,
        allowNull : false
    },
    done : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    }
});

Todo.belongsTo(User);

module.exports = Todo;