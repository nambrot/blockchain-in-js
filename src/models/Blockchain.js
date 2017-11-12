import Block from './Block';
import {fromJSON} from './Block';
import {rerender} from "../store";
import {publish, subscribeTo} from "../network";

class Blockchain {
  constructor(name) {
    this.name = name;
    this.genesis = null;
    this.blocks = {};

    this.createGenesisBlock();

    subscribeTo('BLOCKS_BROADCAST', ({ blocks, blockchainName }) => {
      if (blockchainName === this.name) {
        blocks.forEach(block => this._addBlock(fromJSON(this, block)))
      }
    })

    publish('REQUEST_BLOCKS', { blockchainName: this.name })
    subscribeTo('REQUEST_BLOCKS', ({ blockchainName }) => {
      if (blockchainName === this.name)
        publish('BLOCKS_BROADCAST', { blockchainName, blocks: Object.values(this.blocks).map(b => b.toJSON())})
    })
  }

  createGenesisBlock() {
    const block = new Block(this, 'root', this.name);
    this.blocks[block.hash] = block;
    this.genesis = block;
  }

  containsBlock(block) {
    return this.blocks[block.hash] !== undefined
  }

  addBlock(parent) {
    const newBlock = new Block(this, parent.hash);
    this._addBlock(newBlock)
    publish('BLOCKS_BROADCAST', { blocks: [newBlock.toJSON()], blockchainName: this.name })
  }

  _addBlock(block) {
    if (!this.containsBlock(block)) {
      this.blocks[block.hash] = block;
      rerender()
    }
  }
}
export default Blockchain;
