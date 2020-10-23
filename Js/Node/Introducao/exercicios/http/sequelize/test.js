const Sequelize = require("sequelize");
const sequelize = new Sequelize("teste","root","root",{
    host:"localhost",
    dialect:"mysql"
});

sequelize.authenticate().then(()=>{
    console.log("Funcionou");
}).catch((erro)=>{
    console.log("Falha"+erro);
});

const usuario = sequelize.define("usuarios",{
    nome:{
        type:Sequelize.TEXT
    },
    sobrenome:{
        type:Sequelize.STRING
    },
    idade:{
        type:Sequelize.INTEGER
    },
    email:{
        type:Sequelize.STRING
    }
});



const post = sequelize.define('postagens',{
    titulo:{
        type:Sequelize.STRING
    },
    conteudo:{
        type:Sequelize.TEXT
    }
});

post.create({
    titulo:"Tetewsadasd",
    conteudo:"dasdsa"
});

usuario.create({
    nome:"Raphael",
    sobrenome:"Rodrigues",
    idade:18,
    email:"raphael@"
});

//post.sync();
//usuario.sync({force:true});



