const express = require('express');
const app = express();


app.get("/",(req,res) =>{
    res.send("HEEEEELLOOOOOOOOOOOOOOOOOOOO");
});

app.get("/sobre",(req,res)=>{
    res.send("Pagína sobre muitas coisas");
});


app.get("/raphael",(req,res)=>{
res.send("Raphael Barbosa Rodrigues");
});


app.listen(8080,function(){
    console.log("Servidor criado!!");

});
