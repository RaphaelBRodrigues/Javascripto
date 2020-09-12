const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const router = require("./home/routes");
const articlesController = require("./articles/articlesController");
const categoriesController = require("./categories/categoriesController");
const userController = require("./user/UserController");
const session = require("express-session");


app.use(session({
    secret:"guiaprogramador123",
    cookie:{
        maxAge:3000000
    },

}));

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(router);
app.use("/",categoriesController);
app.use("/",articlesController);
app.use("/",userController);


app.get("*",(req,res)=>{
    res.status(404).redirect("/");
});



app.listen(8000,()=>{
    console.log("Rodando");
});