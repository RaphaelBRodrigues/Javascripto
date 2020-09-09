const fs = require("fs");
const util = require("util");


class Reader{
    Read(filepath){
        fs.readFile(filepath,"utf-8",(erro,data)=>{
            if(erro){
                console.log(erro);
            }else{
                console.log((data));
                return data;
            }
        });
    }
}

module.exports = Reader;