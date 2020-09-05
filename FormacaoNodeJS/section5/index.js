const express = require("express");
const app = express();
const routes = require("./src/router");
const bodyParser = require("body-parser");
const connection = require("./db/database");
const perguntaModel = require("./db/Pergunta");

connection.authenticate().then(()=>{
	console.log("Conectado");
}).catch((err)=>{
	console.log(err);
});



app.set("view engine","ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(routes);




app.listen(8080,()=>{
    console.log("FOi");
});
