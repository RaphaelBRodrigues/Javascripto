const router = require("express").Router();

const CategoryModel = require("../categories/Category");
const ArticleModel = require("../articles/Article");

router.get("/",async (req,res)=>{

    const Articles = await ArticleModel.findAll({include:[{model:CategoryModel}]},{raw:true});
    const Categories = await CategoryModel.findAll({raw:true});

    res.render("index",{articles:Articles,Categories});
});

module.exports = router;