const express = require("express");
const router = express.Router();
const Postagem = require("../models/Posts");
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");


router.get("/",(req,res)=>{
    Postagem.find().populate("categoria").limit(4).lean().then((posts)=>{
        res.render("home/index",{posts:posts});
    })
});

router.get("/postagens/:slug",(req,res)=>{
    Postagem.findOne({slug:req.params.slug}).lean().then((postagem)=>{
        if(postagem){
            res.render("home/postagem",{post:postagem});
        }else{
            req.flash("error_msg","Postagem inexistente");
            res.redirect("/")
        }
    }).catch((e)=>{
        req.flash("error_msg","Postagem inexistente");
        res.redirect("/home")
    });
});

    router.get("/categorias",(req,res)=>{
        Categoria.find().lean().then((cat)=>{
            res.render("categorias/index",{Categoria:cat});
        }).catch(()=>{
            req.flash("error_msg","Erro ao consultar categorias");
        });
    });

    router.get("/categorias/:slug",(req,res)=>{
        Categoria.findOne({slug:req.params.slug}).lean().then((cat)=>{
            if(cat){
                Postagem.find({categoria: cat._id}).lean().then((posts)=>{
                    console.log(posts);

                    res.render("categorias/postagens",{posts:posts,cat:cat});
                }).catch(()=>{
                    req.flash("error_msg","Categoria não encontrada");
                    res.redirect("/")               
                 });
            }else{
                req.flash("error_msg","Categoria não encontrada");
                res.redirect("/")
            }
        }).catch((e)=>{

        });
    })



module.exports = router;