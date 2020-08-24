console.clear();

function sendEmail(body, to) {
    return new Promise((resolve, reject) => {
        let error = false;
        setTimeout(() => {
            
            console.log("Enviando email");

            if(!error){
                resolve({status:200 , to});
            }else{
                reject("mierda");
            }


        }, 2000);
    });
}


sendEmail("Hellow world","@everyone")
.then((res)=>{
    console.table(res);
})
.catch((err)=>{
    console.log(":( "+ err);
});