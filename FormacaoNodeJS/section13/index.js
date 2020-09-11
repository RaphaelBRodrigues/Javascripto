const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const GameController = require("./games/GameController");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(GameController);

app.get("*",(req,res)=>{
    res.status(404).send("Ops!");
});

app.listen(8080,()=>{
    console.log("Foi");
});