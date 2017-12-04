import React, { Component } from "react";

export default class IdentityListItem extends Component {
  render() {
    return (
      <div>
        <h6>{this.props.identity.name}</h6>
        <ul>
          <li>
            Public Key:
            <textarea
              className="pt-input"
              spellCheck={false}
              style={{ width: "100%", height: "100px" }}
              value={this.props.identity.publicKey}
              readOnly
            />
          </li>
          <li>
            Private Key:
            <textarea
              className="pt-input"
              spellCheck={false}
              style={{ width: "100%", height: "100px" }}
              value={this.props.identity.privateKey}
              readOnly
            />
          </li>
        </ul>
      </div>
    )
  }
}
