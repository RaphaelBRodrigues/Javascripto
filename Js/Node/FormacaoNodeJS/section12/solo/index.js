const fs = require("fs");


fs.readFile("./test.json",{encoding:"utf-8"},(error,data)=>{
    const json = JSON.parse(data);
    console.log(json.data);
});

fs.writeFile("./test.json",`

    {
  "type":"json",
  "data": "blblalblalsflalflaslfas",
  "publish": "false"
}
`
    ,(err)=>{
    console.log(err);
});