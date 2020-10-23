const express = require("express");
const router = express.Router();
const CategoryModel = require("./Category");
const slugify = require("slugify");
const {adminAuth } = require("../middlewares/adminAuth");

router.get("/categories",adminAuth,(req,res)=>{

    CategoryModel.findAll().then(data=>{
        console.log(data);
    }).catch(err => {
        console.log(err);
    })

    res.send({})
});

router.get("/admin/categories/new",adminAuth,(req,res)=>{
    res.render("admin/categories/new.ejs");
});

router.post("/categories/save",adminAuth,(req,res)=>{
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

router.get("/admin/categories",adminAuth,(req,res)=>{

    CategoryModel.findAll({raw:true}).then((categories)=>{
        res.render("admin/categories/index", {categories});
    }).catch((err)=>{
        console.log(err);
    });

});

router.post("/categories/delete/",adminAuth,(req,res)=>{
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

router.get("/admin/categories/edit/:id",adminAuth,(req,res)=>{
    CategoryModel.findByPk(req.params.id).then((category)=>{
        if(category){
            res.render("admin/categories/edit", {category});
        }else{
            res.redirect("/admin/categories/");
        }
    }).catch(()=>{
        res.redirect("/admin/categories/");
    });
});

router.post("/categories/update",adminAuth,(req,res)=> {
    const id = req.body.id;
    const title = req.body.title;
    CategoryModel.update({title,slug:slugify(title)},{where:{id}}).then(()=>{
        res.redirect("/admin/categories/");
    }).catch((err)=>{
        res.send({id,err});

    });

});

module.exports = router;