import sha256 from "crypto-js/sha256";
import { verifySignature } from "../crypto";

export default class Transaction {
  constructor(inputPublicKey, outputPublicKey, amount, fee, signature) {
    this.inputPublicKey = inputPublicKey;
    this.outputPublicKey = outputPublicKey;
    this.amount = amount;
    this.fee = fee;
    this.signature = signature;
    this._setHash();
  }

  hasValidSignature() {
    return (
      this.signature !== undefined &&
      verifySignature(this.hash, this.signature, this.inputPublicKey)
    );
  }

  toJSON() {
    return {
      inputPublicKey: this.inputPublicKey,
      outputPublicKey: this.outputPublicKey,
      amount: this.amount,
      fee: this.fee,
      hash: this.hash,
      signature: this.signature
    };
  }

  _setHash() {
    this.hash = this._calculateHash();
  }

  _calculateHash() {
    return sha256(
      this.inputPublicKey + this.outputPublicKey + this.amount + this.fee
    ).toString();
  }
}

export function transactionFromJSON(transaction) {
  return new Transaction(
    transaction.inputPublicKey,
    transaction.outputPublicKey,
    transaction.amount,
    transaction.fee,
    transaction.signature
  );
}
