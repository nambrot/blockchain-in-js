import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import {getTreeFromFlatData} from 'react-sortable-tree';
import {Button} from '@blueprintjs/core';
import { contains, pluck, pipe } from "ramda";
import "../App.css";

function generateNodeProps(longestChain){
  return function({ node, path }) {
    return {
      buttons: [
        <Button
          text='Add block from here'
          onClick={() => {
            const block = this.props.blockchain.blocks[node.hash]
            block.addChild();
          }}
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
    treeData: [{ title: 'Chicken', children: [ { title: 'Egg' } ] }],
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
      <div>
        <div style={{height: 800}}>
          <SortableTree
            treeData={treeData}
            canDrag={false}
            onChange={treeData => this.setState({ treeData })}
            generateNodeProps={generateNodeProps(longestChain).bind(this)}
          />
        </div>
      </div>
    )

  }
}

export default BlockchainWelcome;
