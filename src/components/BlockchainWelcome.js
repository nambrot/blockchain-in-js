import React, { Component } from "react";
import BlockchainTree from "./BlockchainTree";
import IdentityListItem from "./IdentityListItem";
import { Tab2, Tabs2, Tooltip } from "@blueprintjs/core";
import UTXOPoolTable from "./UTXOPoolTable";
import "../App.css";
import AddIdentity from "./AddIdentity";
class BlockchainWelcome extends Component {
  render() {
    return (
      <div>
        <div style={{ width: "65%", display: "inline-block" }}>
          <h3>Blockchain Visualization</h3>
          <BlockchainTree
            blockchain={this.props.blockchain}
            identities={this.props.identities}
            node={this.props.node}
          />
        </div>
        <div
          style={{
            width: "35%",
            display: "inline-block",
            verticalAlign: "top"
          }}
        >
          <Tabs2>
            <Tab2
              id="utxo"
              title="UTXOPool"
              panel={
                <div>
                  <p>
                    This is the{" "}
                    <Tooltip
                      className="pt-tooltip-indicator"
                      inline={true}
                      content={
                        "A UTXO pool is a list of UTXOs, which are 'owned' by the public key, and can be 'spent' with the corresponding private key."
                      }
                    >
                      UTXO pool
                    </Tooltip>{" "}
                    for the longest chain.
                  </p>
                  {this.props.blockchain.maxHeightBlock().isRoot() ? (
                    <p>The root block has no unspent transaction outputs</p>
                  ) : (
                    <UTXOPoolTable
                      block={this.props.blockchain.maxHeightBlock()}
                    />
                  )}
                </div>
              }
            />
          </Tabs2>
          <hr />
          <Tabs2>
            <Tab2
              id="nodes"
              title="Identities"
              panel={
                <div>
                  {Object.values(this.props.identities).map(identity => (
                    <IdentityListItem
                      key={identity.publicKey}
                      identity={identity}
                    />
                  ))}
                  <AddIdentity />
                </div>
              }
            />
          </Tabs2>
        </div>
      </div>
    );
  }
}

export default BlockchainWelcome;
