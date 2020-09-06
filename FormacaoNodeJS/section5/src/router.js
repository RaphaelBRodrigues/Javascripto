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

    PerguntaModel.findOne({where:{id}}).then((pergunta)=>{
        if(pergunta) {
            res.render("pergunta", {pergunta});
        }else{
            res.redirect("/");
        }}).catch(()=>{

            res.send("Erro");

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

router.get("/resposta/:pergunta?",(req,res)=>{

    if(req.query.title){
        RespostaModel.create({
        title:req.query.title,
        answer:req.query.answer

    }).then(()=>{
        res.send({
            pergunta:req.params.pergunta,
            status:200,
            message:"Registro criado"
        });
    }).catch((err)=>{
        res.send({err});
    });
    }else{
        RespostaModel.findAll({raw:true}).then((data)=>{
            res.send({
                status:200,
                data
            });
        }).catch(()=>{
            res.send({
                status:400,
                message:"Falha ao recuperar registro"
            });
        });
    }





});





module.exports = router;
