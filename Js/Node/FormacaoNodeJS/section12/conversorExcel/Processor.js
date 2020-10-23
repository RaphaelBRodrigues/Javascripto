class Processor{

    static Process(data){
        const lines = data.split("\n");
        let rows = [];

        lines.forEach((row)=>{
           rows.push(row.split(","));
        });

        return rows;
    }

}

module.exports = Processor;