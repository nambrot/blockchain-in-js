import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import {getTreeFromFlatData} from 'react-sortable-tree';
import {Button, Dialog} from '@blueprintjs/core';
import { contains, pluck, pipe } from "ramda";
import NewBlock from "./NewBlock"
import DetailBlock from "./DetailBlock"

function generateNodeProps(longestChain){
  return function({ node, path }) {
    return {
      buttons: [
        <Button
          key='detail'
          iconName="pt-icon-database"
          onClick={this.showBlock(node)}
        />,
        <Button
          key='add'
          text='Add block from here'
          onClick={this.addBlockFrom(node)}
        />
      ],
      node: {
        title: `Block ${node.hash.substr(0, 10)}`,
        subtitle: `Height ${node.height}`,
        expanded: true,
      },
      className: pipe(pluck('hash'), contains(node.hash))(longestChain) ? "partOfLongestChain" : ""
    }
  }
}

class BlockchainWelcome extends Component {
  state = {
    addBlock: null,
    showBlock: null
  }
  addBlockFrom = (parent) => {
    return (evt) => {
      const parentBlock = parent.blockchain.blocks[parent.hash]
      this.setState({ addBlock: parentBlock.createChild(this.props.node.publicKey) })
    }
  }
  showBlock = (block) => {
    return (evt) => {
      const showBlock = block.blockchain.blocks[block.hash]
      this.setState({ showBlock })
    }
  }
  closeAddBlock = () => {
    this.setState({ addBlock: null })
  }
  closeShowBlock = () => {
    this.setState({ showBlock: null })
  }
  render() {
    const treeData = getTreeFromFlatData({
      flatData: Object.values(this.props.blockchain.blocks),
      getKey: (block) => block.hash,
      getParentKey: (block) => block.parentHash,
      rootKey: this.props.blockchain.genesis.parentHash
    });
    const longestChain = this.props.blockchain.longestChain();
    return (
      <div style={{height: 800}}>
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
          style={{width: '70%'}}
        >
          <NewBlock
            block={this.state.addBlock}
            onCancel={this.closeAddBlock}
            node={this.props.node}
          />
        </Dialog>
        <Dialog
          isOpen={this.state.showBlock !== null}
          onClose={this.closeShowBlock}
          transitionDuration={50}
          title="Block Detail"
          style={{width: '70%'}}
        >
          <DetailBlock
            block={this.state.showBlock}
            onCancel={this.closeShowBlock}
            identities={this.props.identities}
          />
        </Dialog>
      </div>
    )

  }
}

export default BlockchainWelcome;
