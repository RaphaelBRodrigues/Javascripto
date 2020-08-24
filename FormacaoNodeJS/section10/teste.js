


function teste(){
    return new Promise((resolve,reject)=>{
        if(!true){
            resolve({
                status:200
            });
        }else{
            reject({
                status:400
            });
        }
    });
}



teste().then(({ status })=>{
    console.table(status);
}).catch(({ status })=>{
    console.table({ status });
});