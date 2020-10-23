class Dado{
    constructor(faces) {
        this.faces = faces;
    }

    JogarDado(){

        const sorteado = Math.ceil((Math.random() * this.faces)) ;
        return sorteado;
    }
}

const dado = new Dado(78);

console.log(dado.JogarDado());

