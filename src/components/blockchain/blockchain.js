const Block = require("./block");
const SHA256 = require ("crypto-js/sha256"); 
const { async } = require("@firebase/util");
class Blockchain{
    constructor(){
        //coinstructor para todos los bloques
        this.chain = [];
        this.height = -1;
        //añadir el bloque el qeu es el genesis 
        this.initializeChain();
    }
    async initializeChain(){
        //en caso de que sea la primera vez que se crea la blockchain
        if(this.height == -1){
            const block = new Block({data: "Bloque Génesis"});
            await this.addBlock(block);
        }
    }
    //recibe un bloque de la cadena
    addBlock(block){
        let self = this;
        return new Promise( async(resolve, reject) => {
            //obtenemos la posicion del bloque
            block.height = self.chain.length;
            //ahora el tiempo de creación
            block.time = new Date().getTime().toString();
            //comprobacion de la cadena en el bloque
            if(self.chain.length > 0){
                block.previousBlockHash = self.chain[self.chain.length - 1].hash;
            }
            //validar bloque a bloque
            let errors = await self.validateChain();
            if(errors.length > 0){
                //finalizamos la promesa para no validar la cadena
                reject(new Error("La cadena no es valida: ", errors));
            }
            block.hash = SHA256(JSON.stringify(block)).toString();
            //añadimos al arreglo
            self.chain.push(block);
            resolve(block);
        });
    }
    validateChain(){
        let self = this;
        const errors = [];

        return new Promise( async(resolve, reject) => {
            self.chain.map( async(block) => {
                try {
                    let isValid = await block.validate();
                    if(!isValid){
                        errors.push(new Error('El bloque no es valido'));
                    }
                } catch (error) {
                    
                }
            });
            resolve(errors);
        });
    }
    //llamar a todos lo bloques y vaya imprimiendo
    print(){
        let self = this;
        for(let block of self.chain){
            console.log(block.toString());
        }
    }
}
export default Blockchain;