const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Game = require("./db/Game");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.json({
        teste:"Ola"
    });
});

app.post("/games",async (req,res)=>{
    const { title , price , release } = req.body;
    const result = await Game.create({
        price,
        title,
        release:Date.now()
    });

    res.send({
        result
    });
});

app.get("/games", async (req,res)=>{
    const games = await Game.findAll({raw:true});
    res.json({games});
});

app.listen(8080,()=>{

    console.log("Foi");
});