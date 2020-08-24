const db = require("./db");

const Post = db.sequelize.define("postagens",{
    titulo:{
        type:db.Sequelize.STRING
    },
    conteudo:{
        type:db.Sequelize.TEXT
    }
}); 



/*
Post.sync({force:true}).then(()=>{
    console.log("Beleza");
}).catch(()=>{
    console.log("Não tão beleza");
});
*/

module.exports = Post;
