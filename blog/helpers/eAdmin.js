module.exports = {
    eAdmin:(req,res,next)=>{

        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next();
        }else{
            req.flash("error_msg","Você deve fazer o login antes de acessar esta rota");
            res.redirect("/");
        }
    }
}