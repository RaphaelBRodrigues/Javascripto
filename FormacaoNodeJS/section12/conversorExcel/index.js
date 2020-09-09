const Reader = require("./Reader");
const Processor = require("./Processor");

const read = new Reader();


(async function main(){
    const data = await read.Read("./test.csv");
    const processedData = Processor.Process(data);
    console.log(processedData);
}());

