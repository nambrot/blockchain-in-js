import React, { Component } from "react";
import { Collapse, Button, Callout, Icon } from "@blueprintjs/core";
import Key from "./Key";
import UTXOPoolTable from "./UTXOPoolTable";
import AddIdentity from "./AddIdentity";
import TransactionTable from "./TransactionTable";
import { state } from "../store";

export default class NewBlockTransactionList extends Component {
  state = {
    isAddingNewTransaction: false,
    inputPublicKey: "",
    outputPublicKey: "",
    transactionAmount: 0
  };
  onChangeInputPublicKey = inputPublicKey => {
    this.setState({ inputPublicKey });
  };
  onChangeOutputPublicKey = outputPublicKey => {
    this.setState({ outputPublicKey });
  };
  onChangeTransactionAmount = evt => {
    this.setState({ transactionAmount: parseFloat(evt.target.value) || 0 });
  };
  addTransaction = () => {
    if (this.state.isAddingNewTransaction) {
      this.props.block.addTransaction(
        this.state.inputPublicKey,
        this.state.outputPublicKey,
        this.state.transactionAmount
      );
      this.setState({
        isAddingNewTransaction: false,
        inputPublicKey: "",
        outputPublicKey: "",
        transactionAmount: 0
      });
      this.props.rerender();
    } else {
      this.setState({ isAddingNewTransaction: true });
    }
  };

  shouldValidateTransaction() {
    return this.state.inputPublicKey !== "" && this.state.transactionAmount > 0;
  }

  isValidTransaction() {
    return this.props.block.isValidTransaction(
      this.state.inputPublicKey,
      this.state.transactionAmount
    );
  }

  addingTransactionErrorMessage() {
    return this.props.block.addingTransactionErrorMessage(
      this.state.inputPublicKey,
      this.state.transactionAmount
    );
  }

  render() {
    return (
      <div>
        <div>
          <p>
            This is where you can add transactions to this block. The UTXO pool
            will contain the mining reward of the coinbase that you can spend
            immediately
          </p>
          <TransactionTable block={this.props.block} />
          <Collapse isOpen={this.state.isAddingNewTransaction}>
            <table>
              <thead>
                <tr>
                  <th>Sender Public Key</th>
                  <th />
                  <th>Receiver Public Key</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Key
                      value={this.state.inputPublicKey}
                      onChange={this.onChangeInputPublicKey}
                      readOnly={false}
                      tooltipText="Specify the public key of the sender"
                      popover={
                        <div style={{ padding: "10px" }}>
                          <h6>Available UTXOs to spend</h6>
                          <UTXOPoolTable
                            block={this.props.block}
                            onSelectRow={utxo =>
                              this.onChangeInputPublicKey(utxo.publicKey)
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
                      value={this.state.outputPublicKey}
                      onChange={this.onChangeOutputPublicKey}
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
                                  this.onChangeOutputPublicKey(
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
                        height: "100px",
                        width: "100px",
                        fontSize: "34px",
                        textAlign: "center"
                      }}
                      type="number"
                      onChange={this.onChangeTransactionAmount}
                      value={this.state.transactionAmount}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {this.shouldValidateTransaction() &&
              !this.isValidTransaction() && (
                <Callout className="pt-intent-danger">
                  <p>{this.addingTransactionErrorMessage()}</p>
                </Callout>
              )}
          </Collapse>

          <Button
            iconName="pt-icon-add"
            className="pt-intent-primary pt-input-action"
            onClick={this.addTransaction}
            disabled={
              this.state.isAddingNewTransaction && !this.isValidTransaction()
            }
            text={
              this.state.isAddingNewTransaction
                ? "Add Transaction to Block"
                : "Create Transaction"
            }
          />
        </div>
      </div>
    );
  }
}
