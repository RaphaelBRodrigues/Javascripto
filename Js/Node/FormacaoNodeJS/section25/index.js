const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
});

io.on("connection",(socket)=>{

socket.on("boasvindas",(data)=>{
    console.log(data);
})

    socket.on("inputsend",(data)=>{
        console.log(data);
        socket.emit("response","Tamanho da string:"+data.input.length);
    })

    socket.on("disconnect",()=>{
        console.log(`${socket.id} se desconectou`);
    })

});




http.listen(8080,()=>{
   console.log("Rodando");
});