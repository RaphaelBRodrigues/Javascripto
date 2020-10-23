const jwt = require("jsonwebtoken");
const secret = "dsad234assd";

module.exports = function(req,res,next){

    try{
        const authToken = req.headers['authorization'];

        if(authToken != undefined){
            const token = authToken.split(" ")[1];

            const data = jwt.verify(token,secret);
            if(data){
                if(data.role == 1){
                    next();
                }else{
                    res.sendStatus(403);
                }
            }else{
                res.sendStatus(403);
            }


    }    }catch (err){
        res.sendStatus(403);
    }

}