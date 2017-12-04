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

const pair = generatePair();

const identity = {
  name: "Node " + pair.publicKey.substr(0, 10),
  ...pair
}

const identities = {}
identities[identity.publicKey] = identity

let state = {
  blockchains: [defaultBlockchain],
  selectedBlockchain: defaultBlockchain,
  identities: identities,
  node: identity
}

window.state = state

const action = function(action) {
  console.log(action)
  switch (action.type) {
    case 'PICK_BLOCKCHAIN':
      if (action.name === '')
        break;
      let blockchain = find((bc) => bc.name === action.name)(state.blockchains)
      if (blockchain === undefined) {
        blockchain = new Blockchain(action.name)
        state.blockchains.push(blockchain);
      }
      state.selectedBlockchain = blockchain;
      break;
    case 'BLOCKCHAIN_BROADCAST':
      action.names.forEach((name) => {
        if (!any((b) => b.name === name)(state.blockchains)) {
          const blockchain = new Blockchain(name)
          state.blockchains.push(blockchain);
        }
      })
      break;
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
