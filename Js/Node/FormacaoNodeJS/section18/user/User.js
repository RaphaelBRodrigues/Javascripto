const Sequelize = require("sequelize");
const connection = require("../db/connection");


const User = connection.define("User",{
    name:{type:Sequelize.STRING,allowNull:false},
    email:{type:Sequelize.STRING,allowNull:false},
    password:{type:Sequelize.STRING,allowNull:false}
});


// User.sync({force:true});

module.exports = User;