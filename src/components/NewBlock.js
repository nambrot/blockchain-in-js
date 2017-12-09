import React, { Component } from "react";
import classnames from "classnames";
import { Tab2, Tabs2, Button } from "@blueprintjs/core";
import NewBlockHeader from "./NewBlockHeader";
import NewBlockTransactionList from "./NewBlockTransactionList";
import UTXOPoolTable from "./UTXOPoolTable";

class NewBlock extends Component {
  addBlock = evt => {
    if (this.props.block.isValid()) {
      this.props.block.blockchain.addBlock(this.props.block);
      this.props.onCancel();
    }
  };

  rerender = () => {
    this.forceUpdate();
  };
  render() {
    return (
      <div style={{ padding: "10px" }}>
        <Tabs2>
          <Tab2
            id="blockheader"
            title="Block Header"
            panel={
              <NewBlockHeader
                block={this.props.block}
                rerender={this.rerender}
              />
            }
          />
          <Tab2
            id="txs"
            title="Transactions"
            panel={
              <NewBlockTransactionList
                block={this.props.block}
                rerender={this.rerender}
              />
            }
          />
          <Tab2
            id="utxopool"
            title="UTXO Pool"
            panel={
              <div>
                <p>
                  This represents the UTXO pool after the mining reward and all
                  transactions that would be applied, i.e. the successful mining
                  and validation of a block.
                </p>
                <UTXOPoolTable
                  block={this.props.block}
                />
              </div>
            }
          />
        </Tabs2>

        <div style={{ float: "right" }}>
          <Button
            iconName="pt-icon-add"
            className={classnames("pt-intent-primary", {
              "pt-disabled": !this.props.block.isValid()
            })}
            onClick={this.addBlock}
          >
            Add Block
          </Button>
          <Button
            style={{ marginLeft: "10px", marginRight: "24px" }}
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default NewBlock;
