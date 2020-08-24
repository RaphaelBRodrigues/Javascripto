const express = require('express');
const app = new express();
const db = require("./inicio");

app.get("/",(req,res)=>{
    
    new db.User({
        nome:"Teste",
        sobrenome:"Teste",
        email:"raphaelbarbosa.rodrigues@gmail.com",
        idade:18,
        pais:"Brasil"
    }).save().then(()=>{
        console.log("Usuário cadastrado");
    }).catch(()=>{
        console.log("Falha ao cadastrar usuário");
    });
    
    
    res.send("Cadastro");

});




app.listen("8080",()=>{
    console.log("Servidor inicializado");
});