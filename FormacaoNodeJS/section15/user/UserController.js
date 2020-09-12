const UserModel = require("./User");
const router = require("express").Router();


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
        res.statusCode = 200;
        res.json({
            token:"54"
        });
    }else{
        res.status(401);
        res.send({
            error:"Credenciais inválidas"
        });
    }

});





module.exports = router;