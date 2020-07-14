    const express = require("express");
    const router = express.Router();
    const mongoose = require("mongoose");
    require("../models/Categoria");
    const Categoria = mongoose.model("categorias");
    const Postagem = require("../models/Posts");
    const { eAdmin }= require("../helpers/eAdmin");


    router.get("/", eAdmin,(req, res) => {
    console.log("Indo para a raiz do admin");
    res.render("admin/index");
    });

    router.get("/posts", eAdmin,(req, res) => {
    res.send("Posts");
    });

    router.get("/categorias", eAdmin,(req, res) => {
    Categoria.find({})
        .sort({ date: "asc" })
        .lean()
        .then((categorias) => {
        res.render("admin/categorias", { categorias: categorias });
        // console.log(categorias);
        })
        .catch((e) => {
        req.flash("error_msg", "Erro na listagem das categorias");
        res.redirect("/admin");
        });
    // console.log("Categorias");
    });

    router.get("/categorias/add", eAdmin,(req, res) => {
    res.render("admin/addCategoria");
    });

    router.post("/categorias/novas", eAdmin,(req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug,
    };

    var erros = [];

    if (
        !req.body.nome ||
        typeof req.body.nome == undefined ||
        req.body.nome == null
    ) {
        erros.push({ text: "Nome inválido" });
    }
    if (
        !req.body.slug ||
        typeof req.body.slug == undefined ||
        req.body.slug == null
    ) {
        erros.push({ text: "Slug inválido" });
    }
    if (req.body.nome.lenght < 3) {
        erros.push({ text: "Nome da categoria muito pequeno" });
    }

    if (erros.length > 0) {
        res.render("admin/status", { erros: erros });
    } else {
        new Categoria(novaCategoria)
        .save()
        .then(() => {
            console.log("Categoria cadastrada");
            req.flash("success_msg", "Categoria cadastrada com sucesso");
            res.redirect("/admin/categorias");
        })
        .catch(() => {
            console.log("Erro no cadastro da categoria");
            req.flash("error_msg", "Falha no cadastro da categoria");
            res.redirect("/admin/");
        });
        //res.render("admin/status");
    }
    });

    router.get("/categorias/edit/:id", eAdmin,(req, res) => {
    const dados = Categoria.findOne({ _id: req.params.id })
        .lean()
        .then((dados) => {
        res.render("admin/editCategorias", { dados: dados });
        // console.log(dados);
        })
        .catch(() => {
        req.flash("error_msg", "Categoria inválida");
        res.redirect("/admin/categorias");
        });
    });

    router.post("/categorias/edit", eAdmin,(req, res) => {
    const id = req.body.id;
    Categoria.findOne({ _id: id })
        .then((categoria) => {
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;

        categoria
            .save()
            .then(() => {
            req.flash("success_msg", "Categoria atualizada");
            res.redirect("/admin/categorias");
            })
            .catch((e) => {
            req.flash("error_msg", "Erro na atualização da categoria" + e);
            res.redirect("/admin/categorias");
            });
        })
        .catch((error) => {
        req.flash("error_msg", "Erro na atualização da categoria2");
        res.redirect("/admin/categorias");
        });
    });

    router.post("/categorias/deletar", eAdmin,(req, res) => {
    Categoria.deleteOne({ _id: req.body.id })
        .then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso");
        res.redirect("/admin/categorias");
        })
        .catch((e) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria" + e);
        res.redirect("/admin/categorias");
        });
    });

    router.get("/postagens", eAdmin,(request, response) => {
    Postagem.find()
        .populate("categoria")
        .sort({ data: "desc" })
        .then((postagens) => {
        response.render("admin/postagens", {
            postagens: postagens.map((postagens) => postagens.toJSON()),
        });
        })
        .catch((e) => {
        response.flash("error_msg", "Erro na listagem das postagens");
        //res.redirect("/admin");
        //console.log("Erro:"+e);
        });
    });

    router.get("/postagens/add", eAdmin,(request, response) => {
    Categoria.find()
        .lean()
        .then((categorias) => {
        response.render("admin/addPostagem", { categorias: categorias });
        })
        .catch((e) => {
        req.flash("msg_error", e);
        res.redirect("/postagens");
        });
    });

    router.post("/postagens/add", eAdmin,(req, res) => {
    let erros = [];

    if (req.body.categoria == 0) {
        erros.push({ text: "Categoria inválida" });
    }
    if (erros.length > 0) {
        res.render("/postagens/addPostagem", { erros: erros });
    }

    new Postagem({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        conteudo: req.body.conteudo,
        categoria: req.body.categoria,
        slug: req.body.categoria,
    })
        .save()
        .then(() => {
        req.flash("success_msg", "Postagem cadastrada");
        res.redirect("/admin/postagens");
        console.log("Foi");
        })
        .catch((e) => {
        req.flash("error_msg", "Erro no cadastro da postagem");
        console.log(e);
        res.redirect("/admin/postagens");
        });
    });

    router.get("/postagens/editar/:id", eAdmin,(req, res) => {
    Postagem.findOne({ _id: req.params.id })
        .lean()
        .then((post) => {
        Categoria.find()
            .lean()
            .then((cat) => {
            res.render("admin/editPosts", { post: post, cat: cat });
            });

        console.log(post);
        });
    });

    router.post("/postagens/editar", eAdmin,(req, res) => {
    Postagem.findOne({ _id: req.body.id }).then((post) => {
        post.titulo = req.body.titulo;
        post.slug = req.body.slug;
        post.descricao = req.body.descricao;
        post.categoria = req.body.categoria;
        post.conteudo = req.body.conteudo;

        post
        .save()
        .then(() => {
            console.log("Foi");
            req.flash("success_msg", "Post atualizado");

            res.redirect("/admin/postagens");
        })
        .catch((e) => {
            req.flash("error_msg", "Erro ao atualizar postagem");
            res.redirect("/admin/postagens");
        });
    });
    });

    router.get("/postagens/deletar/:id",eAdmin,(req,res)=>{
        Postagem.remove({_id:req.params.id}).then(()=>{
            req.flash("success_msg","Post deletado");
            res.redirect("/admin/postagens");
        }).catch((er)=>{
            req.flash("error_msg","Erro ao remover postagem");
            res.redirect("/admin/postagem");
        });
    });

    module.exports = router;
