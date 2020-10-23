const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/teste",{
    useMongoClient:true
}).then(()=>{
    console.log("Sucesso na conexão com o banco de dados");
}).catch((e)=>{
    console.log("Falha na conexão com o banco de dados"+e);

});

const UserSchema = mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    sobrenome:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    idade:{
        type: Number,
        require: true
    },
    pais:{
        type:String,
        require:false
    } 
}); 


mongoose.model('users',UserSchema);

const User = mongoose.model('users');

// new User({
//     nome:"Raphael",
//     sobrenome:"Barbosa Rodrigues",
//     email:"raphaelbarbosa.rodrigues@gmail.com",
//     idade:18,
//     pais:"Brasil"
// }).save().then(()=>{
//     console.log("Usuário cadastrado");
// }).catch(()=>{
//     console.log("Falha ao cadastrar usuário");
// });



module.exports = {
    User:User
};