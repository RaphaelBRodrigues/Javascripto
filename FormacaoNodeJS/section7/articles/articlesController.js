const express = require("express");
const router = express.Router();
const articleModel = require("./Article");
const CategoryModel = require("../categories/Category");
const slugify = require("slugify");

router.get("/admin/articles", async (req, res) => {
    try {
        const Articles = await articleModel.findAll({include: [{model: CategoryModel}]});
        res.render("admin/articles/index.ejs", {articles: Articles});
    } catch (err) {
        res.render("admin/articles/index.ejs", {articles: {}});
    }
});

router.post("/articles/delete", async (req, res) => {
    const {id} = req.body;
    const destroy = articleModel.destroy({where: {id}});
    res.redirect("/admin/articles");
});

router.get("/admin/articles/new", (req, res) => {
    CategoryModel.findAll({raw: true}).then((categories) => {
        res.render("admin/articles/new.ejs", {categories});
    }).catch(() => {
        res.redirect("/admin/articles");
    });
});

router.post("/articles/save", (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    articleModel.create({
        title,
        body,
        CategoryId: category,
        slug: slugify(title)
    }).then((data) => {
        res.redirect("/admin/articles/new");
    }).catch((err) => {
        res.redirect("/admin/articles/new");
    });


});

router.get("/articles/:slug", async (req, res) => {
    const {slug} = req.body;
    const Articles = await articleModel.findOne({raw: true}, {where: {slug: slug}});
    const Categories = await CategoryModel.findAll({raw: true});

    res.render("articles.ejs", {article: Articles, Categories: Categories});


});

router.get("/category/:slug", async (req, res) => {
    const { slug } = req.params;

    try {
        const Categories = await CategoryModel.findAll({raw: true});
        const selectedCategory = await CategoryModel.findOne({where: {slug}});
        const Articles = await articleModel.findAll({where: {CategoryId: selectedCategory.id}});

        res.render("articles.ejs",{
            Categories,
            articles:Articles
        });

    }catch(err){
        res.send({err});
    }
});

router.get("/admin/articles/edit/:id",async (req,res)=>{
    const { id } = req.params;

    const categories = await CategoryModel.findAll({raw:true});
    const article = await articleModel.findOne({ where:{id}});

    res.render("admin/articles/edit.ejs",{categories,article});
});

router.post("/articles/update",async (req,res)=>{
    const { category , title ,body , id } = req.body;

    try{
        await articleModel.update({CategoryId:category,title,body,slug:slugify(title)},{where:{id}});
        res.redirect("/admin/articles");
    }catch (err){
        res.redirect("/");
    }
});

router.get("/articles/pages/:num",async (req,res)=>{
    const  num  = parseInt(req.params.num);
    let offset = 0;
    let next = true;
    if(num == 1){
        offset = 0;
    }else{
        offset = (num - 1) * 4;
    }

    const Articles = await articleModel.findAndCountAll({limit:4,offset});
    const Categories = await CategoryModel.findAll({raw:true});
    if(offset + 4 > Articles.count){
        next = false;
    }


    res.render("admin/articles/page.ejs",{articles:Articles.rows, next,Categories,page:num});

});

module.exports = router;