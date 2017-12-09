import React, { Component } from "react";
import Key from "./Key";
import classnames from "classnames";
import { state } from "../store"

export default class UTXOPoolTable extends Component {
  static defaultProps = {
    onSelectRow: null
  }
  render() {
    return (
      <div>
        <table className={classnames("pt-table", {"pt-interactive": this.props.onSelectRow !== null }) }>
          <thead>
            <tr>
              <th>Name (where known)</th>
              <th>Public Key</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(this.props.block.utxoPool.utxos).map(utxo => {
              const identity = state.identities[utxo.publicKey]
              return (
                <tr key={utxo.publicKey} onClick={() => this.props.onSelectRow !== null && this.props.onSelectRow(utxo)}>
                  <td>{identity && identity.name}</td>
                  <td><Key value={utxo.publicKey} /></td>
                  <td>{utxo.amount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
