class Table{
    constructor(data) {
        this.header = data[0];
        data.shift();
        this.rows = data;
    }

    get rowsQuantity(){
        return this.rows.length;
    }
    get columnsQuantity(){
        return this.header.length;
    }
}

module.exports = Table;