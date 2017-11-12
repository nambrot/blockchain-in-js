
import {action, state} from './store';
import {subscribeTo, publish} from './network'
action({})

subscribeTo('BLOCKCHAIN_BROADCAST', (names) => {
  action({ type: 'BLOCKCHAIN_BROADCAST', names })
})

subscribeTo('BLOCKCHAIN_BROADCAST_REQUEST', () => {
  publish('BLOCKCHAIN_BROADCAST', state.blockchains.map((b) => b.name))
})

publish('BLOCKCHAIN_BROADCAST_REQUEST', {})
