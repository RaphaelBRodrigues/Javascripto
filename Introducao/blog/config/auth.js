const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");


module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'email',passwordField:"senha"},(email,senha,done)=>{
        User.findOne({email:email}).lean().then((usuario)=>{
            if(!usuario){
                return done(null,false,{message:"Conta inexistente"});
            }

            bcrypt.compare(senha,usuario.senha,(erro,batem)=>{
                if(batem){
                    return done(null,usuario);
                }else{
                    return done(null,usuario,{message:"Senha incorreta"});
                };

            });

        })
    }));


    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
}


