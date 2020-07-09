const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

//SQL
const Sequelize = require('sequelize');
const sequelize = new Sequelize("teste","root","root",{
    host:"127.0.0.1",
    dialect:"mysql"
});

//Handlebars
app.engine('handlebars',handlebars({defaultLayout:"main"}));
app.set("view engine","handlebars");

//Body Parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/cadastro",(req,res)=>{
    res.render(__dirname +'/views/layouts/form') 
        //res.render("/home/raphael/Desktop/Pessoal/node/exercicios/firstProject/views/form");
});

app.post("/adicionar",(req,res)=>{
    console.log("Rota adicionar");
    res.send("Título:"+ req.body.titulo + "<br>Conteúdo:"+req.body.conteudo);
});


const teste = sequelize.define('tessss',{
    col:{
        type:Sequelize.STRING
    }
});
teste.create({
    col:"testeSolo"
});
teste.sync().then(()=>{
    console.log("Sync com sucesso");
});
app.listen(8080,()=>{
    console.log("Servidor Rodando");
});