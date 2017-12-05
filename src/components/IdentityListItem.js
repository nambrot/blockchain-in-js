import React, { Component } from "react";
import Key from "./Key";
import { Tab2, Tabs2 } from "@blueprintjs/core";

export default class IdentityListItem extends Component {
  render() {
    return (
      <div>
        <h6>{this.props.identity.name}</h6>
        <Tabs2>
          <Tab2
            id="public"
            title="Public Key"
            panel={<Key value={this.props.identity.publicKey} />}
          />
          <Tab2
            id="private"
            title="Private Key"
            panel={
              <textarea
                className="pt-input"
                spellCheck={false}
                style={{ width: "100%", height: "100px" }}
                value={this.props.identity.privateKey}
                readOnly
              />
            }
          />
        </Tabs2>
      </div>
    );
  }
}
