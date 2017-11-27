import sha256 from 'crypto-js/sha256';
const DIFFICULTY = 2

class Block {
  constructor(blockchain, parentHash, height, nonce = '') {
    this.blockchain = blockchain;
    this.nonce = nonce;
    this.parentHash = parentHash;
    this.height = height;
    this._setHash()
    // for visualization purposes
    this.expanded = true;
  }

  isValid() {
    return this.parentHash === 'root' ||
      (this.hash.substr(-DIFFICULTY) === "0".repeat(DIFFICULTY) &&
      this.hash === sha256(this.nonce + this.parentHash).toString())
  }

  createChild() {
    return new Block(this.blockchain, this.hash, this.height + 1)
  }

  setNonce(nonce) {
    this.nonce = nonce
    this._setHash()
  }

  toJSON() {
    return {
      hash: this.hash,
      nonce: this.nonce,
      parentHash: this.parentHash,
      height: this.height
    }
  }

  _setHash() {
    this.hash = sha256(this.nonce + this.parentHash).toString()
  }
}

export default Block;

export function fromJSON(blockchain, data) {
  return new Block(blockchain, data.parentHash, data.height, data.nonce)
}
