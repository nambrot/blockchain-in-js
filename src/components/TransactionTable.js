import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import Key from "./Key";
import Signature from "./Signature";

export default class TransactionTable extends Component {
  static defaultProps = {
    noTransactionsText: "",
    transactionAction: () => {}
  };
  render() {
    if (Object.keys(this.props.transactions).length === 0)
      return <p>{this.props.noTransactionsText}</p>;

    return (
      <table>
        <thead>
          <tr>
            <th>Transaction Hash</th>
            <th>Sender Public Key</th>
            <th />
            <th>Receiver Public Key</th>
            <th>Amount</th>
            <th>Fee</th>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(this.props.transactions).map(tx => {
            return (
              <tr key={tx.hash}>
                <td>
                  <textarea
                    className="pt-input"
                    spellCheck={false}
                    style={{ width: "150px", height: "75px" }}
                    value={tx.hash}
                    readOnly
                  />
                </td>
                <td>
                  <Key value={tx.inputPublicKey} />
                </td>
                <td>
                  <Icon iconName="pt-icon-arrow-right" />
                </td>
                <td>
                  <Key value={tx.outputPublicKey} />
                </td>
                <td
                  style={{
                    height: "100px",
                    width: "100px",
                    fontSize: "34px",
                    textAlign: "center"
                  }}
                >
                  {tx.amount}
                </td>
                <td
                  style={{
                    height: "100px",
                    width: "100px",
                    fontSize: "34px",
                    textAlign: "center"
                  }}
                >
                  {tx.fee}
                </td>
                <td>
                  <Signature
                    signature={tx.signature}
                    messageToSign={tx.hash}
                    publicKey={tx.inputPublicKey}
                    isEditable={false}
                  />
                </td>
                <td>{this.props.transactionAction(tx)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
