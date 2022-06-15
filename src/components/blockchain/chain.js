
const SHA256 = require('crypto-js/sha256');
class Block{
    //conocer al/los bloques
    constructor(timestamp, data, hashPrevio=''){
        this.timestamp = timestamp
        this.data = data
        this.hashPrevio = hashPrevio
        this.hash = this.calcularHash()
    }
    calcularHash(){
        return SHA256(this.timestamp + this.hashPrevio + JSON.stringify(this.data)).toString()
    }
}
class MasterChain{
    constructor(){
        this.chain = [this.crearBloqueGenesis()]
    }

    crearBloqueGenesis(){
        return new Block('fecha', 'Block Genesis', '0')
    }

    getUltimoBloque(){
        return this.chain[this.chain.length - 1]
    }
    agregarBloque(nuevoBloque){
        nuevoBloque.hashPrevio = this.getUltimoBloque().hash
        nuevoBloque.hash = nuevoBloque.calcularHash()
        this.chain.push(nuevoBloque)
    }
}
export default MasterChain;
//let fabriCoin = new MasterChain()
//fabriCoin.agregarBloque(new Block('fecha',{cantidad: 10}))
//console.log(JSON.stringify(fabriCoin, null, 0))