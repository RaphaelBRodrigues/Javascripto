const connection = require("./connection");
const Sequelize = require("sequelize");

const Game = connection.define("Games",{
    title:{type:Sequelize.STRING,allowNull:false},
    price:{type:Sequelize.INTEGER,allowNull:false},
    release:{type:Sequelize.DATE,allowNull:false,}
});

Game.sync({force:true});

module.exports = Game;