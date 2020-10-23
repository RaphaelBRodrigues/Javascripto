const knex = require("../database/connection");
const User = require("./User");

class PasswordToken{

    async create(email){
       const user = await User.findByEmail(email);
       console.log(user);
       if(user != undefined){
           try{
               const token = Date.now() ;
               const db =  await knex.insert({
                   user_id:user[0].id,
                   used:0,
                   token
               }).table("passwordToken");
            return {db,token,status:true};
           }catch (err){
               console.log(err);
            return {err};
           }

       }else{
           return{
               status:false,
               error:"O usuario nao existe"
           }
        }
    }
    async validate(token){
        try{
            const tokenDB = await knex.select().from("passwordToken").where({token});


            if(tokenDB != undefined){
                const tk = tokenDB[0];
                if(tk.used){
                    return {status:false};
                }else{
                    return {status:true,token:tk};
                }
            }else{

                return {status:false};            }

        }catch (err){

            return {status:false,err};        }
    }

    async setUsed(token){
        await knex.update({used:1}).table("passwordToken").where({token});
    }

    async deleteToken(user_id){
        await knex.delete().from("passwordToken").where({user_id})
    }



}


module.exports = new PasswordToken();