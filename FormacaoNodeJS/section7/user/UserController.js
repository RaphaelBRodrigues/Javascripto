const UserModel = require("./User");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");

router.get("/admin/users",(req,res)=>{
    res.send("lista");
});

router.get("/admin/users/create",(req,res)=>{
    res.render("admin/users/create.ejs",{});
});

router.post("/user/create",async(req,res)=>{
    const { email , password} = req.body;

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password,salt);

    const respo = await UserModel.create({
        email,
        password:hash
    });


        res.redirect("/admin/users");




});

module.exports = router;