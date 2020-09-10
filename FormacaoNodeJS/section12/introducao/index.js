const fs = require("fs");

fs.readFile("./teste.txt",{encoding:"utf-8"},(err,data)=>{
    if(err){
        console.log("Erro ao manipular o arquivo");
    }else {
        console.log(data);
    }
});

fs.writeFile("./teste.txt","Novo conteudo",err =>{
    console.log(err);
});