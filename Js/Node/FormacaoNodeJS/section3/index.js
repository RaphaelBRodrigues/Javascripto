const express = require("express");
const app = express();


app.get("/",(req,res)=>{
	res.send({
		status:200,
		message:"Bem vindo"
	});	
});

app.get("/blog/:name?",(req,res)=>{

	if(req.params){
	const name = req.params.name;
	res.send(`Ola ${name}`);
	}else{
	res.send("Bem vindo"):
	}

});

app.get("/teste",(req,res)=>{
	res.send("Query:"+req.query["nome"]);
});





app.listen(8000,(err)=>{
	if(err){
	   console.log(err);
	}else{
	   console.log("Servidor inicializado");
	}
});
