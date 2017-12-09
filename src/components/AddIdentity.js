import React, { Component } from "react";
import { Button } from "@blueprintjs/core";
import { action } from "../store";

export default class AddIdentity extends Component {
  render() {
    return (
        <Button
        text="Add another identity"
        iconName="pt-icon-add"
        className="pt-intent-primary pt-input-action"
        style={{ paddingLeft: '15px'}}
        onClick={() => action({type: 'ADD_IDENTITY'})}
      />
      )

  }
}
