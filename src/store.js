import './index.css';
import "@blueprintjs/core/dist/blueprint.css";

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {any, find} from 'ramda';
import Blockchain from './models/Blockchain';
import { generatePair } from './crypto'

const defaultBlockchain = new Blockchain('Bitcoin')

function createIdentity() {
  const pair = generatePair();

  return {
    name: "Node " + pair.publicKey.substr(0, 10),
    ...pair
  }
}

const identity = createIdentity()

const identities = {}
identities[identity.publicKey] = identity

let state = {
  blockchains: [defaultBlockchain],
  selectedBlockchain: defaultBlockchain,
  identities: identities,
  node: identity
}

window.state = state

const action = function(actionPayload) {
  console.log(actionPayload)
  switch (actionPayload.type) {
    case 'PICK_BLOCKCHAIN':
      if (actionPayload.name === '')
        break;
      let blockchain = find((bc) => bc.name === actionPayload.name)(state.blockchains)
      if (blockchain === undefined) {
        blockchain = new Blockchain(actionPayload.name)
        state.blockchains.push(blockchain);
      }
      state.selectedBlockchain = blockchain;
      break;
    case 'BLOCKCHAIN_BROADCAST':
      actionPayload.names.forEach((name) => {
        if (!any((b) => b.name === name)(state.blockchains)) {
          const blockchain = new Blockchain(name)
          state.blockchains.push(blockchain);
        }
      })
      break;
    case 'ADD_IDENTITY': {
      const identity = createIdentity()
      state.identities[identity.publicKey] = identity
      break;
    }
    case 'CHANGE_IDENTITY_NAME': {
      const identity = state.identities[actionPayload.publicKey]
      if (identity === undefined) break;
      identity.name = actionPayload.name
      break;
    }
    case 'RERENDER':
      // do nothing really
      break;
    default:
      break;
    }
  const component = ReactDOM.render(<App appState={state}/>, document.getElementById('root'));
  component.forceUpdate()
}


export function rerender() {
  action({type: 'RERENDER'})
}

export {action, state}
