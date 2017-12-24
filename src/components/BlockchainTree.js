import React, { Component } from "react";
import SortableTree from "react-sortable-tree";
import { getTreeFromFlatData } from "react-sortable-tree";
import { Button, Dialog } from "@blueprintjs/core";
import { contains, pluck, pipe } from "ramda";
import NewBlock from "./NewBlock";
import DetailBlock from "./DetailBlock";
import { Tooltip, advanceTo, Dialog as WalkthroughDialog } from "./walkthrough";
import { last } from "ramda";

function generateNodeProps(longestChain) {
  return function({ node, path }) {
    const addBlock = () => {
      this.addBlockFrom(node);
      advanceTo(3);
    };
    const normalButton = (
      <Button key="add" text="Add block from here" onClick={addBlock} />
    );
    const isMaxHeightBlock = last(longestChain).hash === node.hash;

    return {
      buttons: [
        <Button
          key="detail"
          iconName="pt-icon-database"
          onClick={this.showBlock(node)}
        />,
        isMaxHeightBlock ? (
          <Tooltip
            content={
              <p style={{ maxWidth: "250px" }}>
                Mining blocks means adding blocks to another parent block by
                pointing to it in the block header. Unless someone else gives
                you coins, mining is the only way for you to get coins, so let's
                start here.
              </p>
            }
            next={addBlock}
            nextLabel="Start mining!"
            step={2}
          >
            {normalButton}
          </Tooltip>
        ) : (
          normalButton
        )
      ],
      node: {
        title: `Block ${node.hash.substr(0, 10)}`,
        subtitle: `Height ${node.height}`,
        expanded: true
      },
      className: pipe(pluck("hash"), contains(node.hash))(longestChain)
        ? "partOfLongestChain"
        : ""
    };
  };
}

class BlockchainWelcome extends Component {
  state = {
    addBlock: null,
    showBlock: null
  };
  addBlockFrom = parent => {
    const parentBlock = parent.blockchain.blocks[parent.hash];
    this.setState({
      addBlock: parentBlock.createChild(this.props.node.publicKey)
    });
  };
  showBlock = block => {
    return evt => {
      const showBlock = block.blockchain.blocks[block.hash];
      this.setState({ showBlock });
    };
  };
  closeAddBlock = () => {
    this.setState({ addBlock: null });
  };
  closeShowBlock = () => {
    this.setState({ showBlock: null });
  };
  render() {
    const treeData = getTreeFromFlatData({
      flatData: Object.values(this.props.blockchain.blocks),
      getKey: block => block.hash,
      getParentKey: block => block.parentHash,
      rootKey: this.props.blockchain.genesis.parentHash
    });
    const longestChain = this.props.blockchain.longestChain();
    return (
      <div style={{ height: 800 }}>
        <SortableTree
          treeData={treeData}
          canDrag={false}
          onChange={treeData => this.setState({ treeData })}
          generateNodeProps={generateNodeProps(longestChain).bind(this)}
        />
        <Dialog
          isOpen={this.state.addBlock !== null}
          onClose={this.closeAddBlock}
          transitionDuration={50}
          title="Add block"
          style={{ width: "95%" }}
        >
          <NewBlock
            block={this.state.addBlock}
            onCancel={this.closeAddBlock}
            node={this.props.node}
          />
        </Dialog>
        {this.state.showBlock === null && (
          <WalkthroughDialog step={16} title="The end" nextLabel="Bye!">
            <div>
              <p>
                Thank you you following this demo. You can continue to play
                around with this to get a better intuitive understanding of how
                blockchains work. I especially recommend you to work blocks from
                various places and see how it impacts the consensus of the
                system. I would love to hear your feedback, you can find me at{" "}
                <a
                  href="https://nambrot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  nambrot.com
                </a>
                . If you enjoyed this demo, feel free to{" "}
                <a
                  href="https://twitter.com/intent/tweet?text=Check%20out%20this%20cool%20blockchain%20demo%20at%20blockchain.nambrot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  tweet it
                </a>{" "}
                .
              </p>
            </div>
          </WalkthroughDialog>
        )}
        <Dialog
          isOpen={this.state.showBlock !== null}
          onClose={this.closeShowBlock}
          transitionDuration={50}
          title="Block Detail"
          style={{ width: "70%" }}
        >
          <DetailBlock
            block={this.state.showBlock}
            onCancel={this.closeShowBlock}
            identities={this.props.identities}
          />
        </Dialog>
      </div>
    );
  }
}

export default BlockchainWelcome;
