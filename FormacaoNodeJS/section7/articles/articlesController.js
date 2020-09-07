const express = require("express");
const router = express.Router();
const articleModel = require("./Article");

router.get("/articles",(req,res)=>{
    res.send({})
});



module.exports = router;