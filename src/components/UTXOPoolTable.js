import React, { Component } from "react";
import Key from "./Key";

class RootUTXOPoolTable extends Component {
  render() {
    return (<p>The root block has no unspent transaction outputs</p>)
  }
}

class RealUTXOPoolTable extends Component {
  render() {
    return (
      <div>
        <table className="pt-table .modifier">
          <thead>
            <tr>
              <th>Name (where known)</th>
              <th>Public Key</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(this.props.block.utxoPool.utxos).map(utxo => {
              const identity = this.props.identities[utxo.publicKey]
              return (
                <tr key={utxo.publicKey}>
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

export default class UTXOPoolTable extends Component {
  render() {
    if (this.props.block.isRoot())
      return <RootUTXOPoolTable />
    else
      return <RealUTXOPoolTable block={this.props.block} identities={this.props.identities} />
  }
}
