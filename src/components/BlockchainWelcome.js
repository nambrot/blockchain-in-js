import React, { Component } from 'react';
import BlockchainTree from "./BlockchainTree"
import IdentityListItem from "./IdentityListItem"
import "../App.css";

class BlockchainWelcome extends Component {
  render() {
    return (
      <div>
        <div style={{width: '70%', display: 'inline-block'}}>
          <BlockchainTree
            blockchain={this.props.blockchain}
            node={this.props.node}
          />
        </div>
        <div style={{width: '20%', display: 'inline-block', verticalAlign: 'top'}}>
          { Object.values(this.props.identities).map(identity => <IdentityListItem identity={identity} />)}
        </div>
      </div>
    )

  }
}

export default BlockchainWelcome;
