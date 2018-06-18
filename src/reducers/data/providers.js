import {
  SET_PROVIDER
} from '../../actions/providerActions'

// const localRPCProvider = {
//   type: 'local',   // local, infura, remote, metamask, ledger
//   url: 'localhost:8545',
//   networkID: 8888,
//   websockets: false,
//   legacy: false
// }

const localRPCProvider = {
  type: 'local',
  url: 'http://127.0.0.1:8545',
  networkID: 8888,
  networkName: ''
}

const localWebsocketRPCProvider = {
  type: 'local',
  url: 'ws://127.0.0.1:8546',
  networkID: 8888,
  networkName: ''
}

const rinkebyInfuraWebsocketProvider = {
  type: 'infura',
  url: 'wss://rinkeby.infura.io/_ws',
  networkID: 4,
  networkName: 'rinkeby'
}

const testingMetamaskProvider = {
  type: 'metamask',
  networkID: 8888,
  networkName: ''
}

const rinkebyMetamaskProvider = {
  type: 'metamask',
  networkID: 4,
  networkName: 'rinkeby'
}

// const metamaskProvider = {
//   type: 'injected',
//   websockets: false,
//   legacy: false
// }

const providers = (state = localRPCProvider, action) => {
  let { type, payload } = action
  switch (type) {
    case SET_PROVIDER:
      return {
        ...state,
        type: payload.options.type || state.type,
        url: payload.options.url || state.url,
        networkID: payload.options.networkID || state.networkID,
        networkName: payload.options.networkName || state.networkName
      }
    default:
      return state
  }
}

export default providers
