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
    res.render("admin/categorias");
})

router.get("/categorias/add",(req,res)=>{
    res.render("admin/addCategoria");
});

router.post("/categorias/novas",(req,res)=>{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug

        
    }
    
    
    new Categoria(novaCategoria).save().then(()=>{
        console.log("Categoria cadastrada");
    }).catch(()=>{
        console.log("Erro no cadastro da categoria");
    });
    res.send("das");
});



module.exports = router;