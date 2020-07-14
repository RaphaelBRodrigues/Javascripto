if(process.env.NODE_ENV == "production"){
    module.exports = {
        mongoURL: "mongodb+srv://root:root@cluster0.z5bdr.mongodb.net/blogapp?retryWrites=true&w=majorityy"
    }
}else{
    module.exports = {
        mongoURL: "mongodb://localhost/blog"
    }
    
}