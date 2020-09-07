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

module.exports = router;