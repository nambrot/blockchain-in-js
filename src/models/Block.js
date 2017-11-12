import sha256 from 'crypto-js/sha256';

class Block {
  constructor(blockchain, parentHash, nonce = sha256(new Date().getTime().toString()).toString()) {
    this.blockchain = blockchain;
    this.nonce = nonce;
    this.parentHash = parentHash;
    this.hash = sha256(this.nonce + this.parentHash).toString()

    // for visualization purposes
    this.title = `Block ${this.hash.substr(0, 10)}`;
    this.expanded = true;
  }

  addChild() {
    this.blockchain.addBlock(this);
  }

  toJSON() {
    return {
      hash: this.hash,
      nonce: this.nonce,
      parentHash: this.parentHash
    }
  }
}

export default Block;

export function fromJSON(blockchain, data) {
  return new Block(blockchain, data.parentHash, data.nonce)
}
