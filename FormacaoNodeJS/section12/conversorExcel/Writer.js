const fs = require("fs");
const util = require("util");

class Writer{
    static async Write(filepath,data){
        try{
            fs.writeFile(filepath,data,err => {
                if(err){
                    console.log(err);
                }
            });
            return true;
        }catch (err){
            console.log(err);
            return false;
        }
    }
}

module.exports = Writer;