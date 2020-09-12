const UserModel = require("./User");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");

router.get("/admin/users",async (req,res)=>{
    const users = await UserModel.findAll({raw:true});
    res.render("admin/users/index.ejs",{users});
});

router.get("/admin/users/create",(req,res)=>{
    res.render("admin/users/create.ejs",{});
});

router.post("/user/create",async(req,res)=>{
    const { email , password} = req.body;

    const emailDB = await UserModel.findOne({where: {email}});
    if(emailDB){
        res.redirect("/");
    }

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password,salt);

    const respo = await UserModel.create({
        email,
        password:hash
    });


        res.redirect("/admin/users");




});

router.get("/login",(req,res)=>{
    res.render("admin/users/login.ejs");
});

router.post("/user/login",async(req,res)=>{
   const { password , email } = req.body;

   const user = await UserModel.findOne({where:{email}});
    if(user){
        const correct = bcryptjs.compareSync(password,user.password);
        if(correct){
            req.session.user = {
                id:user.id,
                email:user.email
            };
            res.redirect("/");
        }else{
            res.redirect("/login");
        }
    }else{
        res.redirect("/login");

    }


});

router.get("/logout",(req,res)=>{
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router;