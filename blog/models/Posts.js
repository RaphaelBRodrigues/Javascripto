const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostagemSchema = new Schema({
    titulo:{
        type:String,
        required:true
    },
    descricao:{
        type:String,
        required:true
    },
    conteudo:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'categorias',
        required:true
    },
    data:{
        type:Date,
        default:Date.now()
    }
});

mongoose.model("postagens",PostagemSchema);

const Postagem = mongoose.model("postagens");



module.exports = Postagem;



/*
 new Postagem({
            titulo:"Teste",
            descricao:"Teste solo padssadasd",
            conteudo:"éuasdasdas",
            categoria:"5f0b3a69c67abb5c88027569",
        }).save().then().catch((e)=>{
            console.log("Erro:"+e)
        });
        */