const Knex = require("knex");

const db = new Knex({
    client:"mysql2",
    connection:{
        host:"127.0.0.1",
        user:"root",
        password:"root",
        database:"knexjs"
    }
});


module.exports = db;