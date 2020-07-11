const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
//SQL

//Handlebars
app.engine('handlebars',handlebars({defaultLayout:"main"}));
app.set("view engine","handlebars");

//Body Parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get("/",(req,res) =>{

    Post.findAll({order:[['id','DESC']]}).then((posts)=>{
        res.render(__dirname +'/views/layouts/home',{posts:posts}) 

    });
});

app.get('/apagar/:id',(req,res)=>{
    Post.destroy({where: {'id':req.params.id}}).then(()=>{
        console.log("Apagado");
        res.send("Post "+req.params.id+" deletado");
    }).catch((e)=>{
        console.log("Erro:"+e);
    });


})

app.get("/cadastro",(req,res)=>{
    res.render(__dirname +'/views/layouts/form') 
        //res.render("/home/raphael/Desktop/Pessoal/node/exercicios/firstProject/views/form");
});



app.post("/adicionar",(req,res)=>{
    console.log("Rota adicionar");
    Post.create({
        titulo:req.body.titulo,
        conteudo:req.body.conteudo
    }).then(()=>{
        console.log("Foi");
        res.redirect("/");
    }).catch((e)=>{
        console.log("Não foi");
        res.send("Não foi:"+e);

    });
    console.log("teste");
    
});



app.listen(8080,()=>{
    console.log("Servidor Rodando");
});