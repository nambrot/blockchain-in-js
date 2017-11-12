import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import {getTreeFromFlatData} from 'react-sortable-tree';
import {Button} from '@blueprintjs/core';

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
    return (
      <div>
        <div style={{height: 800}}>
          <SortableTree
            treeData={treeData}
            canDrag={false}
            onChange={treeData => this.setState({ treeData })}
            generateNodeProps={({ node, path }) => ({
              buttons: [
                <Button
                  text='Add block from here'
                  onClick={() => {
                    const block = this.props.blockchain.blocks[node.hash]
                    block.addChild();
                  }}
                />
              ]
            })}
          />
        </div>
      </div>
    )

  }
}

export default BlockchainWelcome;
