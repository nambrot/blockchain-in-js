import React, { Component } from "react";
import { Tooltip, Position } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/labs";

// from https://stackoverflow.com/a/16348977
const stringToColour = function(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export default class Key extends Component {
  static defaultProps = {
    readOnly: true,
    onChange: () => {},
    popover: null,
    tooltipText:
      "The color should help you find instances of this key throughout the page",
    popoverDidOpen: () => {}
  };
  onChange = evt => {
    this.props.onChange(evt.target.value);
  };
  render() {
    return (
      <Tooltip
        content={this.props.tooltipText}
        inline={true}
        position={Position.TOP}
      >
        <Popover2 autoFocus={false} popoverDidOpen={this.props.popoverDidOpen}>
          <textarea
            className="pt-input"
            spellCheck={false}
            style={{
              width: "150px",
              height: "75px",
              borderWidth: "3px",
              borderStyle: "solid",
              borderColor: stringToColour(this.props.value)
            }}
            value={this.props.value}
            readOnly={this.props.readOnly}
            onChange={this.onChange}
          />
          {this.props.popover}
        </Popover2>
      </Tooltip>
    );
  }
}
