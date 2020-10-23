
console.clear();


 function getUsers(){
    return new Promise((resolve,reject)=>{

        setTimeout(()=>{
            if(true){
                resolve([
                    {name:"Raphael" , lang:"PHP"},
                    {name:"Rodrigues" , lang:"JS"}
                ]);
            }else{
                reject({});
            }
        },3000);


    });
}

async function main(){
    const teste = await getUsers();
    console.table(teste);
    console.log("tessss");
}

main();
console.log("teste");

// getUsers().then((data)=>{
//     console.table(data);
// });



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
                reject("mierda");
            }


        }, 2000);
    });
}


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

// console.log("out");