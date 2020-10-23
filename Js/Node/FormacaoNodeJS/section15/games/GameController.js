const router = require("express").Router();
const Game = require("./Game");
const authenticate = require("../middleware/auth").auth;


router.delete("/game/:id",authenticate,(req,res)=>{
    const { id } = req.params;

    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        const status = Game.destroy({where: {id}});
        if(status){
            res.statusCode = 200;
            res.json({status});
        }else{
            res.statusCode = 404;
        }
    }
});

router.post("/game",authenticate,async (req,res)=>{
    const { title , price , release } = req.body;
    try{
        const result = await Game.create({
            price,
            title,
            release:Date.now()
        });
        res.statusCode = 201;
        res.json({result});
    }catch (err){
        res.statusCode = 400;
        res.json();
    }
});

router.get("/games",authenticate,async (req,res)=>{
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

router.get("/game/:id",authenticate,async (req,res)=>{
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

router.put("/game/:id",authenticate,async (req,res)=>{
    const { title , price , release } = req.body;
    const { id } = req.params;

    if(isNaN(id)){
        res.sendStatus(400);
    }

    try{
        const game = await Game.findByPk(id);


        game.title = title ? title : game.title;
        game.price = price ? price : game.price;
        game.release = release ? release : game.release;

        const att = await Game.update({ ...game.dataValues },{where:{id}});

        res.statusCode = 200;
        res.json({att});
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }
});


module.exports = router;