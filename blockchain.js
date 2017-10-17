const SHA256 = require('js-sha256');

class Block {
  constructor(index, data, previousHash){
    this.index = index;
    this.timestamp = new Date();
    this.previousHash = previousHash;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    var sha = SHA256.create();
    sha.update (this.index.toString() + this.timestamp.toString() +
                this.data.toString());
  }
  static first( data = "Genesis"){
    return new Block(0, data, '0');
  }

  static next(previous, data='Transaction Data...'){
    return new Block(previous.index + 1, data, previous.hash);
  }
}

let b0 = Block.first("Genesis");
let b1 = Block.next(b0, 'Transaction Data...');
let b2 = Block.next(b1, 'More data....');
let blockchain = [b0, b1, b2];

console.log(blockchain);
