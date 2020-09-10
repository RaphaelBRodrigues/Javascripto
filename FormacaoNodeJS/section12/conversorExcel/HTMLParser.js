const ejs = require("ejs");

class HTMLParser{


    static async Parse(table){
    const html = await ejs.renderFile("./table.ejs",{
            header:table.header,
            rows:table.rows
        });

    return html;
    }


}

module.exports = HTMLParser;