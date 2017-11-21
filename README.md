# Build your own Blockchain in Javascript

With all the hype about blockchains and cryptocurrencies, I decided to learn a bit more about it. And what better way to learn than to try to build it? Here you will find my attempts to build blockchains from their basic principles, and hopefully in the process it helps someone else to learn something from this as well. Let's get started

## To run

This project is based upon `create-react-app` so a simple `yarn start` will pretty much start everything. You'll only need to start a simple `socket.io` server with `node src/server.js`. You can also run it with `docker-compose` if you prefer.

## Step 1: A chain of blocks?

To understand how blockchains work, let's start with the name. Blockchain? A chain of blocks?

A common misconception is that a blockchain is a single chain of blocks, when in reality, it's more like a tree of blocks. So at any given time, there are multiple chains for blocks by pointing to their respective parent. The pointing happens via hashes which are calculated based upon the data inside the block (i.e. hash of the parent, transaction data and other important stuff)

By pointing via hashes of blocks, we can enforce a specific order of blocks. I.e given a chain of blocks, you can't just take a block in the middle of the chain and change its data, since that would change its hash and subsequently also all blocks that are descendents of the block in question.

```javascript
class Block {
  constructor(blockchain, parentHash, nonce = sha256(new Date().getTime().toString()).toString()) {
    this.blockchain = blockchain;
    this.nonce = nonce;
    this.parentHash = parentHash;
    this.hash = sha256(this.nonce + this.parentHash).toString()
  }
```

If you look at the code, you can see how the P2P aspect of blockchains comes into play. Once a node decided it "mined" a block, it can broadcast that block to all other nodes, you can verify it and then add it to their tree, as well.

![blockbroadcast](https://user-images.githubusercontent.com/571810/32704273-37b7b07a-c7d0-11e7-900c-851031c81ad4.gif)


## Step 2: So what is THE blockchain?

In step 1, we saw that in a chain of blocks, the last block basically validates all data in the chain of its ascendents, as any change in the data up the chain would inevitably change the hash of the last block. That is all great, but what do people mean by THE blockchain?

By definition, THE blockchain is just the longest chain available in the tree. So at one point, a chain can be the lonest one, but then get superseeded by another. Let's visualize the longest chain in the tree.

```javascript
class Blockchain {
  longestChain() {
    const blocks = values(this.blocks)
    const maxByHeight = maxBy(prop('height'))
    const maxHeightBlock = reduce(maxByHeight, blocks[0], blocks)
    const getParent = (x) => {
      if (x === undefined) {
        return false
      }

      return [x, this.blocks[x.parentHash]]
    }
    return reverse(unfold(getParent, maxHeightBlock))
  }
}
```

![longestchain](https://user-images.githubusercontent.com/571810/33043509-b40cb21c-ce13-11e7-8fb2-20f3932e85d1.gif)

So given a tree, the longest chain represents our current view of which history of blocks, and thus which representation of data is the one we deem valid.
