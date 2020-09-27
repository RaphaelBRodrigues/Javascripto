class HomeController{

    async index(req, res){
        res.send("Funcionando");
    }

    async validate(req,res){
        
        res.send("Okay");
    }

}

module.exports = new HomeController();