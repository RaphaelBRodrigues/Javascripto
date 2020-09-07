const Sequelize = require("sequelize");
const connection = require("../database/database");
const CategoryModel = require("../categories/Category");

const Article = connection.define("Article",{
    title:{type:Sequelize.STRING,allowNull:false},
    slug:{type:Sequelize.STRING,allowNull:false},
    body:{type:Sequelize.TEXT,allowNull:false}
});

CategoryModel.hasMany(Article);
Article.belongsTo(CategoryModel);

// Article.sync({force:true});


module.exports = Article;