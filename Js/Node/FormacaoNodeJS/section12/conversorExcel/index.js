const Reader = require("./Reader");
const Processor = require("./Processor");
const Table = require("./Table");
const HTMLParser = require("./HTMLParser");
const Writer = require("./Writer");
const PDFParser = require("./PDFParser");
const fs = require("fs");


const read = new Reader();

(async function main(){
    const data = await read.Read("./test.csv");
    const processedData = Processor.Process(data);
    const table = new Table(processedData);
    const html = await HTMLParser.Parse(table);
    const filename = Date.now();
    const res = Writer.Write("./HTML/"+filename+".html",html);
    PDFParser.Create("./PDF/"+filename+".pdf",html);


}());

