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
    const home = require("./routes/home");
    const User = require("./routes/user");
    const passport = require("passport");
    require("./config/auth")(passport);
    const db = require("./config/db");




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

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    app.use(flash());

    //Middleware
    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.user = req.user || null;
        next();
    });
//Public

    app.use(express.static(path.join(__dirname,"public")));
    console.log(path.join(__dirname,"public"));

//Rotas
    app.use('/admin',admin);
    app.use("/",home);
    app.use("/usuario",User);

//Mongo
    mongoose.Promise = global.Promise
    mongoose.connect(db.mongoURL,{}).then(()=>{
        console.log("Conectado ao banco");
    }).catch((e)=>{
        console.log("Erro"+e)
    });




const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("Servidor inicializado");
})