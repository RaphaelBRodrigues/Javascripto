const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const cookierParser = require("cookie-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set("view engine","ejs");
app.use(cookierParser("dsadsadsa"));
app.use(session({
    secret:"teste",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}));

app.use(flash());

app.get("/",(req,res)=>{

    const error = req.flash("error");
    const data = req.flash("data")[0] || "";

    res.render("index.ejs",{
        error:error[0] || "",
        data
    });
});

app.post("/form",(req,res)=>{

    const { email , name , pontos }  = req.body;

    const error = {
        error:false,
    };

    if(email == "" || email == undefined || typeof email == "Number"){
        error.error = true;
        error.email = "Email inválido";
    }

    if(pontos == "" || pontos == undefined){
        error.error = true;
        error.pontos = "Pontos inválidos";
    }

    if(name == "" || name == undefined || typeof name == "Number"){
        error.error = true;
        error.name = "Nome inválido";
    }


    if(error.error){
       req.flash("error",error);
       req.flash("data",{
           email,
           pontos,
           name
       })
      res.redirect("/");
    }

    res.status(200);
    res.json({
        status:email
    });
});

app.listen(8080,()=>{
    console.log("foi");
})