const express = require("express");
const app = express();
const handlebars = require('express-handlebars');

//SQL
const Sequelize = require('sequelize');
const sequelize = new Sequelize("teste","root","root",{
    host:"127.0.0.1",
    dialect:"mysql"
});

//Handlebars
app.engine('handlebars',handlebars({defaultLayout:"main"}));
app.set("view engine","handlebars");



app.get("/cadastro",(req,res)=>{
    res.render(__dirname +'/views/layouts/form') 
        //res.render("/home/raphael/Desktop/Pessoal/node/exercicios/firstProject/views/form");
});




app.listen(8080,()=>{
    console.log("Servidor Rodando");
});