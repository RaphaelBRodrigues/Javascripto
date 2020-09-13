const db = require("./database");

async function insert() {

    const data = [
        {
            name: "Tszdad2",
            price: 54.2
       },
        {
            name: "sadd23423:GO",
            price: 12.45
        }
    ];

    try{
        const query = await db.insert(data)
            .into("Game");
        console.log(query);
        select();
    }catch (err){
        console.log(err);
    }


}
async function select(){

    try{
        const data = await db.select(["id","name"]).from("Game");
        console.log(data);
    }catch (err){
        console.log(err);
    }

}

async function selectWhere(){
    try{
        const games = await db.select()
                                .from("Game")
                                    .where({id:5})
                                        .whereRaw("name like '%mine%'");

        console.log(games);
    }catch (err){
        console.log(err);
    }
}

async function raw(){
    try{
     const games = await db.raw("SELECT * FROM Game");
     console.log(games[0]);
    }catch (err){
        console.log(err);
    }
}

async function deleteDB(){
    try{
      const res = await db.delete().from("Game").where({id:8});
      console.log(res);
      select();
    }catch (err){
        console.log();
    }
}

async function updateDB(){
    try{
        const data = {
            name:"Move or die"
        };
        const res = await db.update(data).table("Game").where({id:1});
        select();
    }catch (err){
    console.log(err);
    }
}

async function selectOrder(){
    try{
        const data = await db.select()
                            .from("Game")
                                .orderBy("id","desc");
        console.log(data);
    }catch (err){
        console.log(log);

    }
}

async function selectJoin(){
    try{
        const data = await db.select()
            .from("Game")
            .orderBy("id","desc");
        console.log(data);
    }catch (err){
        console.log(log);

    }
}

async function insertStudio(){
    try{
        const data = {
            name:"Betheseda",
            game_id:4
        };
        const dataDB = await db.insert(data).into("Estudio");
        console.log(dataDB);
    }catch (err){
        console.log(err);

    }
}


async function join(){
    try{
        const dataDB = await db.select(["Game.id as Game","Estudio.id as Estudio"]).from("Game").innerJoin("Estudio","game_id","Game.id");
        console.log(dataDB);
    }catch (err){
        console.log(err);

    }
}

join();

// db.raw("SELECT * FROM Estudio").then(data =>{
//     console.log(data[0]);
// })


