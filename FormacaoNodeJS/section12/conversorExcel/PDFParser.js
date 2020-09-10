const pdf = require("html-pdf");

class PDFParser{
    static Create(file,html){
        try{
           pdf.create(html).toFile(file,(err,res)=>{
               if(err){
                   console.log(err);
               }else{
                   console.log(res);
               }
           });


            return true;
        }catch (err){
            console.log(err);
            return false;
        }

        }
}

module.exports = PDFParser;