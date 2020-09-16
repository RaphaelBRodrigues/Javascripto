const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User{
    async new(email,password,name) {
        const dataDB = await this.findEmail(email);
        if (dataDB.exists) {
            console.log("DUPLICADO");
        } else {
            try {
                const hash = await bcrypt.hash(password, 10);
                await knex.insert({
                    email,
                    name,
                    password: hash,
                    role: 0
                }).table("users");
            } catch (err) {
                console.log(err);
            }
        }
    }
    async findEmail(email){
      const emailDB = await knex.select("email").from("users").where({email});
      console.log(emailDB);
      return emailDB == false ? {
          exists: false
      } : {
          exists: true,
          user:emailDB[0]
      };
    }
}

module.exports = new User();