const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require('../models/Categoria');
const Categoria = mongoose.model("categorias");



router.get("/",(req,res)=>{
    console.log("Indo para a raiz do admin");
    res.render("admin/index");

});

router.get("/posts",(req,res)=>{
    res.send("Posts");
})

router.get("/categorias",(req,res)=>{
    Categoria.find().lean().then((categorias) =>{
        res.render("admin/categorias",{categorias:categorias});
        console.log(categorias);
    }).catch((e)=>{
        req.flash("error_msg","Erro na listagem das categorias");
        res.redirect("/admin");
    });
    console.log("Categorias");

})

router.get("/categorias/add",(req,res)=>{
    res.render("admin/addCategoria");
});



router.post("/categorias/novas",(req,res)=>{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
        
    }
    



    var erros = [];
    


    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({text:"Nome inválido"});
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({text:"Slug inválido"});
    }
    if(req.body.nome.lenght < 3){
        erros.push({text:"Nome da categoria muito pequeno"});
    }
    

    if(erros.length > 0){
        res.render("admin/status",{erros:erros});
       }else{  
            new Categoria(novaCategoria).save().then(()=>{
                console.log("Categoria cadastrada");
                req.flash("success_msg","Categoria cadastrada com sucesso");
                res.redirect("/admin/categorias");


            }).catch(()=>{
                console.log("Erro no cadastro da categoria");
                req.flash("error_msg","Falha no cadastro da categoria");
                res.redirect("/admin/");


            });
            //res.render("admin/status");
        }

});


module.exports = router;