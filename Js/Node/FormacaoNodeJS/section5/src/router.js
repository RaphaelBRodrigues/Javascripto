const express = require("express");
const router = express.Router();
const PerguntaModel = require("../db/Pergunta");
const RespostaModel = require("../db/Resposta");

router.get("/", (req, res) => {

    let perguntas;

    PerguntaModel.findAll({raw:true,order:[["id","desc"]]}).then((query)=>{
         perguntas = query;
         console.log(perguntas)
        res.render("index",{perguntas});
    }).catch(()=>{
        res.render("index");
    });


});

router.get("/pergunta/:id",(req,res)=>{
    const id = req.params.id;
    let respostas = [];

    RespostaModel.findAll({
        where:{perguntaId:id},
        order:[['perguntaId','DESC']]
    }).then((data)=>{
        respostas = data;

    }).catch(()=>{
        respostas = [];
    });

    console.log(respostas);

    PerguntaModel.findOne({where:{id}}).then((pergunta)=>{
        if(pergunta) {
            res.render("pergunta", {pergunta,respostas});
        }else{
            res.redirect("/");
        }}).catch((err)=>{

            res.send(err);

    });
});

router.get("/perguntar",(req,res)=>{
    res.render("perguntar.ejs");
});

router.post("/perguntar",(req,res)=>{
        const title = req.body.title;
        const content = req.body.content;

        PerguntaModel.create({
            titulo:title,
            descricao:content
        }).then(()=>{
            res.redirect("/");
    }).catch(()=>{
        res.redirect("/perguntar");
    });
})

router.post("/resposta",(req,res)=>{

        RespostaModel.create({
            perguntaId:req.body.id,
            resposta:req.body.corpo

    }).then(()=>{
            res.redirect("/pergunta/"+req.body.id);
    }).catch((err)=>{
        res.redirect("/pergunta/"+req.body.id);
    });









});





module.exports = router;
