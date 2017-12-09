import sha256 from 'crypto-js/sha256';

export default class Transaction {
  constructor(inputPublicKey, outputPublicKey, amount) {
    this.inputPublicKey = inputPublicKey
    this.outputPublicKey = outputPublicKey
    this.amount = amount
    this._setHash()
  }

  toJSON() {
    return {
      inputPublicKey: this.inputPublicKey,
      outputPublicKey: this.outputPublicKey,
      amount: this.amount,
      hash: this.hash,
    }
  }

  _setHash() {
    this.hash = this._calculateHash()
  }

  _calculateHash() {
    return sha256(this.inputPublicKey + this.outputPublicKey + this.amount).toString()
  }
}
