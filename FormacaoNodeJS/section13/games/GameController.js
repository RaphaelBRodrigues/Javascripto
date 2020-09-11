const router = require("express").Router();
const Game = require("./Game");




router.post("/games",async (req,res)=>{
    const { title , price , release } = req.body;
    try{
        const result = await Game.create({
            price,
            title,
            release:Date.now()
        });
        res.statusCode = 200;
        res.json({result});
    }catch (err){
        res.statusCode = 400;
        res.json();
    }
});

router.get("/games", async (req,res)=>{
    try{
        const games = await Game.findAll({raw:true});
        res.json({games});
        res.statusCode = 200;
    }catch (err){
        res.json({
            err
        });
        res.statusCode = 500;
    }
});

router.get("/game/:id",async (req,res)=>{
    const { id } = req.params;

    if(isNaN(id)){
        res.sendStatus(400);
        res.json({
            status:400,
            messsage:"Invalid id format"
        });
    }

    try{
        const game = await Game.findByPk(id);
        res.statusCode = 200;
        if(game){
            res.json({game});
        }else{
            res.sendStatus(404);
        }

    }catch (err){
        res.statusCode = 400;
        res.json({err});
    }



});

module.exports = router;