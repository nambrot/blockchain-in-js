import sha256 from 'crypto-js/sha256';
import UTXOPool from './UTXOPool';
const DIFFICULTY = 2

class Block {
  constructor(opts) {
    const { blockchain, parentHash, height, coinbaseBeneficiary, nonce, utxoPool } =
      {
        coinbaseBeneficiary: 'root',
        nonce: '',
        utxoPool: new UTXOPool(),
        ...opts
      }
    this.blockchain = blockchain;
    this.nonce = nonce;
    this.parentHash = parentHash;
    this.height = height;
    this.coinbaseBeneficiary = coinbaseBeneficiary
    this.utxoPool = utxoPool
    this._setHash()
    // for visualization purposes
    this.expanded = true;
  }

  isRoot() {
    return this.parentHash === 'root'
  }
  isValid() {
    return this.isRoot() ||
      (this.hash.substr(-DIFFICULTY) === "0".repeat(DIFFICULTY) &&
      this.hash === this._calculateHash())
  }

  createChild(coinbaseBeneficiary) {
    return new Block({
      blockchain: this.blockchain,
      parentHash: this.hash,
      height: this.height + 1,
      coinbaseBeneficiary
    })
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
      height: this.height,
      coinbaseBeneficiary: this.coinbaseBeneficiary
    }
  }

  _setHash() {
    this.hash = this._calculateHash()
  }

  _calculateHash() {
    return sha256(this.nonce + this.parentHash + this.coinbaseBeneficiary).toString()
  }
}

export default Block;

export function fromJSON(blockchain, data) {
  return new Block({
    ...data,
    blockchain
  })
}
