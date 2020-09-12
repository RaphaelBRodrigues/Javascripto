const UserModel = require("./User");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/auth").auth;

const JWTSecret = require("../middleware/auth").JWTSecret;


router.post("/user",async (req,res)=>{

    const { name , email , password } = req.body;

   const userDataDB = await UserModel.create({
        name,
        email,
        password
    });

   if(userDataDB){
       res.statusCode = 201;
       res.send(userDataDB);
   }else{
       res.sendStatus(400);
   }


});

router.post("/auth",async (req,res)=>{

    const { email , password } = req.body;

    if((!email) || (!password)){
        res.sendStatus(400);
    }

    const user = await UserModel.findOne({where:{email}});

    if(!user){
        res.sendStatus(404);
    }

    if((user.email == email) && (user.password == password)){

        jwt.sign({
            id:user.id,
            email
        },JWTSecret,{expiresIn:'1h'},(error,token)=>{
            if(error){
                res.status(500);
                res.json({error});
            }
            res.statusCode = 200;
            res.json({
                token
            });
        });



    }else{
        res.status(401);
        res.send({
            error:"Credenciais inválidas"
        });
    }

});

router.get("/teste",authenticate,(req,res)=>{
    res.json({
        tesdte:"err"
    });
});





module.exports = router;