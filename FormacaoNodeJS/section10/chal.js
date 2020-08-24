console.clear();



function getId(){
    return new Promise((resolve,reject)=>{


        setTimeout(()=>{
            if(true){
                resolve({
                    id:98,
                    status:200
                });
            }else{
                reject({});
            }

        },3000 / 2);

    });
}

function searchEmailDB(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({
                email:"raphael@dev.com"
            });
        },2000);
    });
}


function sendEmail(body, to) {
    return new Promise((resolve, reject) => {
        let error = false;

        setTimeout(() => {
            
            console.log("Enviando email");

            if(!error){
                resolve({status:200 , to});
            }else{
                reject({status:400 , text:"mierda"});
            }


        }, 2000);
    });
}

async function main(){


    try{
        const id = await getId();
        console.info(id);

        const email = await searchEmailDB(id);
        console.info(email);

        await sendEmail("Testee",email);
    
    }catch(err){
        console.table(err);
    }


}

main();
console.log("outMain");

// getId().then(({ id })=>{
//     console.info("id");
//     searchEmailDB(id).then(({ email })=>{
//         console.info("search");

//         sendEmail("Olár" , email).then((data)=>{
//             console.info("email");

//             console.table(data);
//         }).catch((err)=>{
//             console.log(err);
//         });
//     })
//     .catch();
// })
// .catch();

console.log("out");