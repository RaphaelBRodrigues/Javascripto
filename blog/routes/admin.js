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
    Categoria.find({}).sort({date:"asc"}).lean().then((categorias) =>{
        res.render("admin/categorias",{categorias:categorias});
        // console.log(categorias);
    }).catch((e)=>{
        req.flash("error_msg","Erro na listagem das categorias");
        res.redirect("/admin");
    });
    // console.log("Categorias");

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
        };
   
});

    router.get("/categorias/edit/:id",(req,res)=>{
        const dados = Categoria.findOne({_id:req.params.id}).lean().then((dados)=>{
            res.render("admin/editCategorias",{dados:dados});
            // console.log(dados);

        }).catch(()=>{
            req.flash("error_msg","Categoria inválida");
            res.redirect("/admin/categorias");
        });
    });

    router.post("/categorias/edit",(req,res)=>{
        const id = req.body.id;
        Categoria.findOne({_id:id}).then((categoria)=>{

            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;

            categoria.save().then(()=>{
                req.flash("success_msg","Categoria atualizada");
                res.redirect("/admin/categorias");
            }).catch((e)=>{
 
                req.flash("error_msg","Erro na atualização da categoria"+e);
                res.redirect("/admin/categorias");
            })
               
        }).catch((error)=>{
            req.flash("error_msg","Erro na atualização da categoria2");
            res.redirect("/admin/categorias");
        });

        
    });

    router.post("/categorias/deletar",(req,res)=>{
        Categoria.deleteOne({_id:req.body.id}).then(()=>{
            req.flash("success_msg","Categoria deletada com sucesso");
            res.redirect("/admin/categorias");
        }).catch((e)=>{
            req.flash("error_msg","Houve um erro ao deletar a categoria"+e);
            res.redirect("/admin/categorias");
        });
    });


module.exports = router;