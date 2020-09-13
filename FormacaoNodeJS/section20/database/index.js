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

updateDB();