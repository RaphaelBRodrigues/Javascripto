const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
});

io.on("connection",(socket)=>{
    socket.on("disconnect",()=>{
        console.log(`${socket.id} se desconectou`);
    })
    socket.on("message",(data)=>{
        console.log(data);
        io.emit("showMessage",data);
    });

});




http.listen(8080,()=>{
   console.log("Rodando");
});