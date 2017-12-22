import React, { Component } from "react";
import Key from "./Key";
import classnames from "classnames";
import { state } from "../store";
import { Tooltip, advanceTo } from "./walkthrough";

export default class UTXOPoolTable extends Component {
  static defaultProps = {
    onSelectRow: null
  };
  onSelectRow = utxo => {
    return () => {
      if (this.props.onSelectRow !== null) {
        this.props.onSelectRow(utxo);
        advanceTo(7);
      }
    };
  };
  render() {
    const renderedTooltip = false;
    return (
      <div>
        <table
          className={classnames("pt-table", {
            "pt-interactive": this.props.onSelectRow !== null
          })}
        >
          <thead>
            <tr>
              <th>Name (where known)</th>
              <th>Public Key</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(this.props.block.utxoPool.utxos).map(utxo => {
              const identity = state.identities[utxo.publicKey];
              let name = identity && identity.name;

              if (identity !== undefined && !renderedTooltip) {
                name = (
                  <td>
                    <Tooltip
                      content={
                        <p style={{ maxWidth: "250px" }}>
                          Here you see spendable coins who the owners of them
                          are. With coins that you now own, you can either hodl
                          or use them to transact. Let's send some money!
                        </p>
                      }
                      next={this.onSelectRow(utxo)}
                      nextLabel="Spread the love!"
                      step={6}
                    >
                      {name}
                    </Tooltip>
                  </td>
                );
              } else {
                name = <td>{name}</td>;
              }
              return (
                <tr key={utxo.publicKey} onClick={this.onSelectRow(utxo)}>
                  {name}
                  <td>
                    <Key value={utxo.publicKey} />
                  </td>
                  <td>{utxo.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
