//Módulos
    const express = require('express');
    const app = express();
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const admin = require('./routes/admin');
    const path = require('path');
    const session = require("express-session");
    const flash = require("connect-flash");

//Config
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    app.engine('handlebars',handlebars({defaultLayout:'main'}));
    app.set('view engine','handlebars');

    app.use(session({
        secret:"elelel",
        resave:true,
        saveUninitialized:true
    }));

    app.use(flash());

    //Middleware
    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    });
//Public

    app.use(express.static(path.join(__dirname,"public")));
    console.log(path.join(__dirname,"public"));

//Rotas
    app.use('/admin',admin);

//Mongo
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://localhost/blog",{
        useMongoClient:true
    }).then(()=>{
        console.log("Conectado ao banco");
    }).catch((e)=>{
        console.log("Erro"+e)
    });




const port = 8080;
app.listen(port,()=>{
    console.log("Servidor inicializado");
})