const SHA256 = require('js-sha256');

class Block {
  constructor(index, data, previousHash){
    this.index = index;
    this.timestamp = new Date();
    this.data = data;
    this.previousHash = previousHash;
    // this.hash = this.calculateHash();
    var res = this.computeHashWithProofOfWork();
    this.nonce = res[0];
    this.hash = res[1];
  }
  //
  // calculateHash(){
  //   var sha = SHA256.create();
  //   sha.update (this.index.toString() + this.timestamp.toString() +
  //               this.data.toString());
  //   return sha.hex();
  // }

  // keep 'mining' unti
  computeHashWithProofOfWork(difficulty='00'){
    var nonce = 0;
    while (true){
      var hash = this.calcHashWithNonce(nonce);
      if (hash.startsWith(difficulty)){
        return [nonce, hash];
      } else {
        nonce += 1;
      }
    }
  }

  calcHashWithNonce(nonce = 0){
    var sha = SHA256.create();
    sha.update(nonce.toString() + this.index.toString() +
              this.timestamp.toString() + this.data + this.previousHash);
    return sha.hex();
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
