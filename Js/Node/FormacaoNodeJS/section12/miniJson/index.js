const fs = require("fs");

function modificarUsuario(nome,curso) {

    fs.readFile("./user.json", {encoding: "utf-8"}, (err, data) => {
        if (!err) {
            const dataJson = JSON.parse(data);
            dataJson.user = nome;
            dataJson.course = curso;
            fs.writeFile("./user.json", JSON.stringify(dataJson), (err) => {
                if(err){
                    console.log(err);
                }
            });
        }
    });
}
   modificarUsuario("BARBOSA","JAVA");
