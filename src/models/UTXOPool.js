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

  handleTransaction(transaction, feeReceiver) {
    if (!this.isValidTransaction(transaction))
      return
    const inputUTXO = this.utxos[transaction.inputPublicKey];
    inputUTXO.amount -= transaction.amount
    inputUTXO.amount -= transaction.fee
    if (inputUTXO.amount === 0)
      delete this.utxos[transaction.inputPublicKey]
    this.addUTXO(transaction.outputPublicKey, transaction.amount)
    this.addUTXO(feeReceiver, transaction.fee)
  }

  isValidTransaction(transaction) {
    const { inputPublicKey, amount, fee } = transaction
    const utxo = this.utxos[inputPublicKey]
    return utxo !== undefined && utxo.amount >= (amount + fee) && amount > 0
  }

  addingTransactionErrorMessage(transaction) {
    const { inputPublicKey, amount, fee } = transaction
    const utxo = this.utxos[inputPublicKey]
    if (utxo === undefined)
      return "No UTXO was associated with this public key"
    if (amount <= 0)
      return "Amount has to be at least 0"
    if (utxo.amount < amount + fee)
      return `UTXO associated with this public key (${utxo.amount}) does not cover desired amount (${amount}) and fee (${fee})`
  }

  clone() {
    return new UTXOPool(clone(this.utxos))
  }
}
