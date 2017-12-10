import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import Key from "./Key";
import { state } from "../store";
import UTXOPoolTable from "./UTXOPoolTable";
import AddIdentity from "./AddIdentity";
import Signature from "./Signature";

export default class NewTransaction extends Component {
  static defaultProps = {
    transaction: null,
    block: null,
    onChangeInputPublicKey: () => {},
    onChangeOutputPublicKey: () => {},
    onChangeTransactionAmount: () => {},
    onChangeFee: () => {},
    onChangeSignature: () => {}
  };
  render() {
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
          <tr>
            <td>
              <textarea
                className="pt-input"
                spellCheck={false}
                style={{ width: "150px", height: "75px" }}
                value={this.props.transaction.hash}
                readOnly
              />
            </td>
            <td>
              <Key
                value={this.props.transaction.inputPublicKey}
                onChange={this.props.onChangeInputPublicKey}
                readOnly={false}
                tooltipText="Specify the public key of the sender"
                popover={
                  <div style={{ padding: "10px" }}>
                    <h6>Available UTXOs to spend</h6>
                    <UTXOPoolTable
                      block={this.props.block}
                      onSelectRow={utxo =>
                        this.props.onChangeInputPublicKey(utxo.publicKey)
                      }
                    />
                  </div>
                }
              />
            </td>
            <td>
              <Icon iconName="pt-icon-arrow-right" />
            </td>
            <td>
              <Key
                value={this.props.transaction.outputPublicKey}
                onChange={this.props.onChangeOutputPublicKey}
                readOnly={false}
                tooltipText="Specify who should receive the coins with their public key"
                popover={
                  <div style={{ padding: "10px" }}>
                    <h6>Identities you control</h6>
                    {Object.values(state.identities).map(identity => {
                      return (
                        <a
                          key={identity.publicKey}
                          onClick={() =>
                            this.props.onChangeOutputPublicKey(
                              identity.publicKey
                            )
                          }
                        >
                          <li>{identity.name}</li>
                        </a>
                      );
                    })}
                    <AddIdentity />
                  </div>
                }
              />
            </td>
            <td>
              <input
                style={{
                  height: "75px",
                  width: "75px",
                  fontSize: "34px",
                  textAlign: "center"
                }}
                type="number"
                onChange={this.props.onChangeTransactionAmount}
                value={this.props.transaction.amount}
              />
            </td>
            <td>
              <input
                style={{
                  height: "75px",
                  width: "75px",
                  fontSize: "34px",
                  textAlign: "center"
                }}
                type="number"
                onChange={this.props.onChangeFee}
                value={this.props.transaction.fee}
              />
            </td>
            <td>
              <Signature
                signature={this.props.transaction.signature}
                messageToSign={this.props.transaction.hash}
                publicKey={this.props.transaction.inputPublicKey}
                onChangeSignature={this.props.onChangeSignature}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
