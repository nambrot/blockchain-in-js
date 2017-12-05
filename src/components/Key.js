import React from "react";
import { Tooltip, Position } from "@blueprintjs/core"

// from https://stackoverflow.com/a/16348977
const stringToColour = function(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export default (props) => {
  return (
    <Tooltip
      content={"The color should help you find instances of this key throughout the page"}
      inline={true}
      position={Position.TOP}
    >
      <textarea
        className="pt-input"
        spellCheck={false}
        style={{ width: "200px", height: "100px", borderWidth: '3px', borderStyle: 'solid', borderColor: stringToColour(props.value) }}
        value={props.value}
        readOnly
      />
    </Tooltip>
  );
};
