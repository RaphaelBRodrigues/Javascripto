console.clear();


const sendEmail = (body,to,callback) => {
    setTimeout(()=>{
        console.info(`
            Para:${to}
            ${body}
        `);
        callback("OK");
    },8000);
};




console.log("Começou");
sendEmail("OLáaaaaaa","Raphael",
(status)=>console.log("Status:"+status)
);
