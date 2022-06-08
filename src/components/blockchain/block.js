//const base32 = require ('crypto-js');
const SHA256 = require ("crypto-js/sha256");
const hex2ascii = require("hex2ascii");
class block{
    constructor(data){
        //hash semilla
        this.hash = null;
        //la posicion
        this.height = 0;
        //datos que pasen 
        this.body = JSON.stringify(data).toString('hex');
        //es la fecha
        this.time = 0;
        //es el hash anterior como lista enlazada
        this.previousBlockHash = "";
    }

    //validar
    validate(){
        const self = this;
        return new Promise((resolve, reject) =>{
            //guardar hash actual
            let currentHash = self.hash;
            //calcular si el hash es el mismo del guardado "estructura"
            self.hash = SHA256 (JSON.stringify({...self, hash:null})).toString();
            //si el hash actual es distinto al anterior
            if(currentHash != self.hash ){
                return resolve(false);
            }else{
                resolve(true);
            }
        });
    }
    //obtener el bloque
    getBlockData(){
        const self = this;
        return new Promise((resolve, reject)=>{
            let encodedData = self.body;
            let decodedData = hex2ascii(encodedData);
            //convertir el objeto en javascript
            let dataObject = JSON.parse(decodedData);

            //comprobar por ultimo bloque
            if(dataObject == 'Genesis Block' ){
                reject(new Error('Este es el bloque génesis'))
            }
            resolve(dataObject);
        });
    }
    toString(){
        const {hash, height, body, time, previousBlockHash} = this;
        return 'Block - hash: ${hash} height: ${height body: ${body} time: ${time} previousBlockHash: ${previousBlockHash}}';

    }

}

module.exports = block;