const Sequelize = require("sequelize");
const connection = require("./database");


const Resposta = connection.define("Resposta",{
    title:{type:Sequelize.STRING},
    answer:{type:Sequelize.TEXT}
});

Resposta.sync({force:false}).then(()=>{
    console.log("Model Pergunta criado");
});

module.exports = Resposta;
