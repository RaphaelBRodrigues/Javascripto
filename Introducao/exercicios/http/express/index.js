const express = require('express');
const app = express();


app.get("/",(req,res) =>{
    //res.sendFile(__dirname+"/../html/index.html");
    res.sendFile("/home/raphael/Desktop/Pessoal/node/exercicios/http/html/index.html");
});

app.get("/sobre",(req,res)=>{
    res.send("Pagína sobre muitas coisas");
});


app.get("/raphael",(req,res)=>{
res.send("Raphael Barbosa Rodrigues");
});

app.get("/ola/:nome/:cargo/:senioridade",(req,res)=>{
    res.send("Olá <i>"+req.params.nome+"</i> Você foi admitido para o cargo de "+ req.params.cargo +" "+ req.params.senioridade);
});

app.get("/solo2/:user",(req,res)=>{
    res.send("Teste:"+req.params.user);
});


app.listen(8080,function(){
    console.log("Servidor criado!!");

});
