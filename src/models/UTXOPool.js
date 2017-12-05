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

  clone() {
    return new UTXOPool(clone(this.utxos))
  }
}
