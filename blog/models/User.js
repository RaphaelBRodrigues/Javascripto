const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    nome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    senha:{
        type:String,
        required:true
    },
    administrador:{
        type:Number,
        default:0
    }

});

mongoose.model("usuarios",UserSchema);
const User = mongoose.model("usuarios");

module.exports = User;