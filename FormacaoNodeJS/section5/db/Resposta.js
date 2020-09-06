const Sequelize = require("sequelize");
const connection = require("./database");


const Resposta = connection.define("Resposta",{
    perguntaId:{type:Sequelize.INTEGER,allowNull: false},
    resposta:{type:Sequelize.TEXT,allowNull:false}
});

Resposta.sync({force:false}).then(()=>{
    console.log("Model Resposta criado");
}).catch((err)=>{
    console.log(err);
});

module.exports = Resposta;
