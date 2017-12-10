import React, { Component } from "react";
import { Dialog, Button } from "@blueprintjs/core";
import NewTransaction from "./NewTransaction";
import Transaction from "../models/Transaction";
import UTXOPoolTable from "./UTXOPoolTable";
import classnames from "classnames";
import { publish } from "../network";

export default class WelcomeUTXOPoolTable extends Component {
  state = {
    isAddingTransaction: false,
    inputPublicKey: "",
    outputPublicKey: "",
    transactionAmount: 0,
    fee: 0,
    signature: ""
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
  onChangeFee = evt => {
    this.setState({ fee: parseFloat(evt.target.value) || 0 });
  };
  onChangeSignature = signature => {
    this.setState({ signature });
  };
  exitAddingTransaction = () => {
    this.setState({
      isAddingTransaction: false,
      inputPublicKey: "",
      outputPublicKey: "",
      amount: 0,
      fee: 0,
      signature: ""
    });
  };

  authoringTransaction() {
    return new Transaction(
      this.state.inputPublicKey,
      this.state.outputPublicKey,
      this.state.transactionAmount,
      this.state.fee,
      this.state.signature
    );
  }

  isValidTransaction() {
    return (
      this.state.inputPublicKey !== "" &&
      this.state.outputPublicKey !== "" &&
      this.state.transactionAmount > 0 &&
      this.authoringTransaction().hasValidSignature()
    );
  }
  broadcastTransaction = () => {
    publish("TRANSACTION_BROADCAST", {
      blockchainName: this.props.blockchain.name,
      transaction: this.authoringTransaction().toJSON()
    });
    this.exitAddingTransaction();
  };
  render() {
    return (
      <div>
        <UTXOPoolTable
          block={this.props.blockchain.maxHeightBlock()}
          onSelectRow={utxo =>
            this.setState({
              isAddingTransaction: true,
              inputPublicKey: utxo.publicKey,
              amount: utxo.amount
            })
          }
        />
        <Dialog
          isOpen={this.state.isAddingTransaction}
          onClose={this.exitAddingTransaction}
          title="Broadcast transaction"
          style={{ width: "95%" }}
        >
          <div style={{ padding: "10px" }}>
            <NewTransaction
              transaction={this.authoringTransaction()}
              onChangeInputPublicKey={this.onChangeInputPublicKey}
              onChangeOutputPublicKey={this.onChangeOutputPublicKey}
              onChangeTransactionAmount={this.onChangeTransactionAmount}
              onChangeFee={this.onChangeFee}
              onChangeSignature={this.onChangeSignature}
              block={this.props.blockchain.maxHeightBlock()}
            />
            <div style={{ float: "right" }}>
              <Button
                iconName="pt-icon-add"
                className={classnames("pt-intent-primary", {
                  "pt-disabled": !this.isValidTransaction()
                })}
                onClick={this.broadcastTransaction}
              >
                Broadcast
              </Button>
              <Button
                style={{ marginLeft: "10px", marginRight: "24px" }}
                onClick={this.exitAddingTransaction}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
