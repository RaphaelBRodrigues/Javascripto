const express = require("express");
const router = express.Router();
const CategoryModel = require("./Category");
const slugify = require("slugify");


router.get("/categories",(req,res)=>{

    CategoryModel.findAll().then(data=>{
        console.log(data);
    }).catch(err => {
        console.log(err);
    })

    res.send({})
});

router.get("/admin/categories/new",(req,res)=>{
    res.render("admin/categories/new.ejs");
});

router.post("/categories/save",(req,res)=>{
    let title = req.body['title'];
    console.log("title:"+title);
    if(title != undefined){
        CategoryModel.create({
            title,
            slug:slugify(title)
        }).then(()=>{
            res.redirect("/");
        }).catch((err)=>{
            res.send(err);
        });
    }else{
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories",(req,res)=>{

    CategoryModel.findAll({raw:true}).then((categories)=>{
        res.render("admin/categories/index", {categories});
    }).catch((err)=>{
        console.log(err);
    });

});

router.post("/categories/delete/",(req,res)=>{
    const id = req.body.id;
    if(id) {
        CategoryModel.destroy({where:{id}}).then((data) => {
            res.send({data});

        }).catch((err) => {
            console.log(err);
        });
    }

     res.redirect("/admin/categories");

});

module.exports = router;