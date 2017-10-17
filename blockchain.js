const SHA256 = require('js-sha256');

class Block {
  constructor(index, data, previousHash){
    this.index = index;
    this.timestamp = new Date();
    this.data = data;
    this.previousHash = previousHash;
    var res = this.computeHashWithProofOfWork();
    this.nonce = res[0];
    this.hash = res[1];
  }


  // POW system
  // Deter atacks - make it more economically difficult to sabotage than collaborate.
  // Keep calculating hash with different nonce values until returns one starting with '00';

  computeHashWithProofOfWork(difficulty='00'){
    var nonce = 0;
    while (true){
      var hash = this.calcHashWithNonce(nonce);
      if (hash.startsWith(difficulty)){
        return [nonce, hash];
      } else {
        // Hash is to be recomputed with different nonce value
        nonce += 1;
      }
    }
  }

  // Changing the nonce value will make the hash completely different
  calcHashWithNonce(nonce = 0){
    var sha = SHA256.create();
    sha.update(nonce.toString() + this.index.toString() +
              this.timestamp.toString() + this.data + this.previousHash);
    return sha.hex();
  }
  static first(...args){
    var data = args.length === 1 ? args[0] : args;
    return new Block(0, data, '0');
  }

  static next(previous, ...args){
    var data = args.length === 1 ? args[0] : args;
    return new Block(previous.index + 1, data, previous.hash);
  }
}

let b0 = Block.first({from: 'Joe', to: 'Jon', amount: 5});
let b1 = Block.next(b0,
  {from: 'Jon', to: 'Joe', amount: 10},
  {from: 'Sally', to: 'Joe', amount: 15});
let b2 = Block.next(b1,
  {from: 'Sally', to: 'Jon', amount: 30},
  {from: 'Jon', to: 'Joe', amount: 10});
let blockchain = [b0, b1, b2];

console.dir( blockchain, { depth: 3 } );
