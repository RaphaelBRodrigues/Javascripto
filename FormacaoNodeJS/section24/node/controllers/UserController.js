const router = require("express").Router();
const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "dsad234assd";


class UserController{
    async create(req,res){
        const { email , name , password } = req.body;

        if(email == undefined || email == "" || email == " "){
            res.status(400);
            res.json({err: "Email invalido"});
        }
        if(name == undefined){
            res.status(400);
            res.json({err: "Nome invalido"});
            return;
        }
        if(password == undefined){
            res.status(400);
            res.json({err: "Senha invalido"});
        }
        const emailDB = await User.findEmail(email);

        if(emailDB.exists){
            res.status(406);
            res.json({err: "Email já cadastrado"});
            return;
        }else{
            await User.new(email,password,name);
        }
        res.send("Capturado");
        return;
    }
    async listUsers(req,res){
        try{
            const users = await User.findAll();

            if(users){
                res.status(200);
                res.json(users);
                return;
            }else{
                res.status(404);
                res.json({
                    error:"Usuários não encontrados"
                });
                return;
            }

        }catch (err){
            console.log(err);
            res.status(500);
            res.json({
                error:"Erro inesperado"
            });
        }
    }
    async getUserById(req,res){
        const { id } = req.params;
    
        try{
            const user = await User.findById(id);
            console.log(user);
            if(user){
                res.status(200);
                res.json({
                    user,
                    status:1
                });
                return;
            }else{
            res.status(404)
            res.json({
                error:"Usuário não encontrado"
            })
        }
        }catch (err){
            res.status(500);
            res.json({
                err
            });
        }
    }

    async edit(req,res){
        const { name , role , email} = req.body;
        const { id } = req.params;


        const user = await User.updateUser(id,email,name,role);
        if(user != undefined){
            if(user.status){
                res.status(200);
                res.json({user});
            }else{
                res.status(404);
                res.json({err:user.err});
            }
        }else{
            res.status(500);
            res.json({
                err:"Erro inesperado"
            });
        }
    }
    async deleteUser(req,res){
        const { id } = req.params;

        const user = await User.deleteUser(id);
        if(user){
            res.status(200);
            res.json({user});
            return;
        }else{
            res.status(404);
            res.json({
                error:"Falha ao deletar usuário"
            });
        }

    }
    async recoverPassword(req,res){
        const email = req.body.email
        const respoDB = await PasswordToken.create(email);
        if(respoDB.status){
                res.status(200);
                res.json(respoDB);
        }else{
            res.status(406);
            res.json(respoDB);
        }
    }
    async changePassword(req,res){
        const { token , password } = req.body;

        const isValid = await PasswordToken.validate(token);

        console.log(isValid);

        if(isValid.status){
            try{
                const user = await User.changePassword(password,isValid.token.user_id,isValid.token.token);
                res.status(200);
                res.json({message:"Senha alterada",user});
            }catch (err){
                console.log(err);
                res.status(406);
                res.json({err});
            }

        }else{
            res.status(406);
            res.send("Token inválido");
        }
    }

    async login(req,res){
        const { email , password } = req.body;

        const user = await User.findByEmail(email);
        const match = await bcrypt.compare(password, user[0].password)


        if(user.length > 0){
                if(match){
                    try{
                        const token = jwt.sign({
                            email:user[0].email,
                            role:user[0].role
                        },secret);
                        res.status(200);
                        res.json({token});
                    }catch (err){
                        console.log(err);
                        res.status(406);
                        res.json({err:"Erro ao gerar o token"});
                    }

                }else{
                    res.json({erro:"Senha inválida"});
                }
        }else{
            res.json({erro:"Usuário não encontrado"});

        }

    }
}


module.exports = new UserController();
