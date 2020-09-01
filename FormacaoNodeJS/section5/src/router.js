const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    const name = "Raphael";
    const lang = "js";

    res.render("index",
        {
            name,
            lang
        }
    );


});


module.exports = router;