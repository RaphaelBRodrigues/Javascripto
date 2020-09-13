const jwt = require("jsonwebtoken");
const JWTSecret = "dasdsaasdaadwe2423542";

function auth(req,res,next){

    let authToken = "";
        if(req.headers["authorization"]) {
             authToken = req.headers["authorization"].split(" ")[1];
        }else{
            res.status(401);
            res.json({
                error:"Cadê o token mermão?"
            });
        }

    if(authToken){
        try{
            jwt.verify(authToken,JWTSecret,(error,data)=>{
                if(error){
                    res.status(401)
                    res.json({
                        error:"Invalid token"
                    });
                }else{
                    req.token = authToken;
                    req.loggedUser = {
                      id:data.id,
                        email:data.email
                    };
                    console.log(req.loggedUser);
                    next();

                }
            });
        }catch (err){
            res.status(401);
            res.json({
                error:"Invalid token"
            });
        }
    }else{
        res.status(401);
        res.json({
            error:"Invalid token"
        });
    }
}


module.exports = {auth , JWTSecret};