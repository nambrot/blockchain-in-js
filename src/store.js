import "./index.css";
import "@blueprintjs/core/dist/blueprint.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { any, find } from "ramda";
import Blockchain from "./models/Blockchain";
import { generatePair } from "./crypto";

const defaultBlockchain = new Blockchain("Bitcoin");

function createIdentity() {
  const pair = generatePair();

  return {
    name: "Node " + pair.publicKey.substr(0, 10),
    ...pair
  };
}

const identity = createIdentity();

const identities = {};
identities[identity.publicKey] = identity;

let state = {
  walkthrough: {
    show: true,
    step: 0,
    enabled: window.localStorage.getItem("walkthroughEnabled") === null
  },
  blockchains: [defaultBlockchain],
  selectedBlockchain: defaultBlockchain,
  identities: identities,
  node: identity
};

window.state = state;

// If prospective employers see this, I know very much that mutation of state in place is discouraged, but was done here for pedagogical reasons
const action = function(actionPayload) {
  console.log(actionPayload);
  switch (actionPayload.type) {
    case "PICK_BLOCKCHAIN":
      if (actionPayload.name === "") break;
      let blockchain = find(bc => bc.name === actionPayload.name)(
        state.blockchains
      );
      if (blockchain === undefined) {
        blockchain = new Blockchain(actionPayload.name);
        state.blockchains.push(blockchain);
      }
      state.selectedBlockchain = blockchain;
      break;
    case "BLOCKCHAIN_BROADCAST":
      actionPayload.names.forEach(name => {
        if (!any(b => b.name === name)(state.blockchains)) {
          const blockchain = new Blockchain(name);
          state.blockchains.push(blockchain);
        }
      });
      break;
    case "ADD_IDENTITY": {
      const identity = createIdentity();
      state.identities[identity.publicKey] = identity;
      break;
    }
    case "CHANGE_IDENTITY_NAME": {
      const identity = state.identities[actionPayload.publicKey];
      if (identity === undefined) break;
      identity.name = actionPayload.name;
      break;
    }
    case "HIDE_WALKTHROUGH": {
      state.walkthrough = { ...state.walkthrough, show: false };
      break;
    }
    case "ADVANCE_WALKTHROUGH": {
      if (actionPayload.step !== undefined) {
        if (state.walkthrough.step > actionPayload.step) break;
        state.walkthrough.step = actionPayload.step;
      } else state.walkthrough.step += 1;
      state.walkthrough.show = true;
      break;
    }
    case "DISABLE_WALKTHROUGH": {
      state.walkthrough = { ...state.walkthrough, enabled: false };
      window.localStorage.setItem("walkthroughEnabled", false);
      break;
    }
    case "RERENDER":
      // do nothing really
      break;
    default:
      break;
  }
  const component = ReactDOM.render(
    <App appState={state} />,
    document.getElementById("root")
  );
  component.forceUpdate();
};

export function rerender() {
  action({ type: "RERENDER" });
}

export { action, state };
