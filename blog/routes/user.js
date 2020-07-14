const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");



router.get("/cadastro",(req,res)=>{
    res.render("user/cadastro");
});


router.post("/cadastro",(req,res)=>{
    let erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({text:"Nome de usuário inválido"});
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({text:"Nome de email inválido"});
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({text:"Nome de senha inválida"});
    }
    if(req.body.senha.length < 4){
        erros.push({text:"A senha é muito curta"});
    }
    if(req.body.senha != req.body.senha2){
        erros.push({text:"As senhas não coincídem"});
    }

    if(erros.length > 0){
        res.render("user/cadastro",{erros:erros});
    }else{

        User.findOne({email:req.body.email}).lean().then((usuario)=>{
            if(usuario){
                req.flash("error_msg","Já existe uma conta cadastrada com este mesmo email");
                res.redirect("/usuario/cadastro");
            }else{
             const Usuario =  new User({
                    nome:req.body.nome,
                    email:req.body.email,
                    senha:req.body.senha,
                    administrador:1
                });
                bcrypt.genSalt(10,(er,salt)=>{
                    bcrypt.hash(Usuario.senha,salt,(erro,hash)=>{
                        if(erro){
                            req.flash("error_msg","Erro na gravação do usuário");
                            res.redirect("/");
                        }else{
                            Usuario.senha = hash;
                            Usuario.save().then(()=>{
                                req.flash("success_msg","Usuárioo cadastrado")
                                res.redirect("/")
                            }).catch((e)=>{
                                req.flash("error_msg","Erro na gravação do usuário");
                                res.redirect("/");     
                                });
                        }
                    });
                });
            }
        }).catch((e)=>{
            req.flash("error_msg","Erro interno");
            res.redirect("/");
        });

    }

});

router.get("/login",(req,res)=>{
    res.render("user/login");
});

router.post("/login",(req,res,next)=>{

    passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/usuario/login",
        failureFlash:true
    })(req,res,next);


});

router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/");
});



module.exports = router;
