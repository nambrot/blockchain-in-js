import { clone } from 'ramda';
import UTXO from './UTXO';

export default class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  addUTXO(publicKey, amount) {
    if (this.utxos[publicKey]) {
      this.utxos[publicKey].amount += amount
    } else {
      const utxo = new UTXO(publicKey, amount)
      this.utxos[publicKey] = utxo
    }
  }

  handleTransaction(transaction) {
    if (!this.isValidTransaction(transaction.inputPublicKey, transaction.amount))
      return
    const inputUTXO = this.utxos[transaction.inputPublicKey];
    inputUTXO.amount -= transaction.amount
    if (inputUTXO.amount === 0)
      delete this.utxos[transaction.inputPublicKey]
    this.addUTXO(transaction.outputPublicKey, transaction.amount)
  }

  isValidTransaction(inputPublicKey, amount) {
    const utxo = this.utxos[inputPublicKey]
    return utxo !== undefined && utxo.amount >= amount && amount > 0
  }

  addingTransactionErrorMessage(inputPublicKey, amount) {
    const utxo = this.utxos[inputPublicKey]
    if (utxo === undefined)
      return "No UTXO was associated with this public key"
    if (amount === 0)
      return "Amount has to be at least 0"
    if (utxo.amount < amount)
      return `UTXO associated with this public key (${utxo.amount}) does not cover desired amount (${amount})`
  }

  clone() {
    return new UTXOPool(clone(this.utxos))
  }
}
