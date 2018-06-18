import { providers } from 'ethers'

export const getProviderInfo = getState => {
  let { type, url, networkID, networkName } = getState().data.provider
  return { type, url, networkID, networkName }
}

export const getProviderType = getState => {
  let { type } = getState().data.provider
  return type
}

export const getNetworkID = getState => {
  let { networkID } = getState().data.provider
  return networkID
}

export const getProvider = getState => {
  let { type, url, networkName } = getState().data.provider
  if (type === 'local') {
    return getLocalProvider({ url })
  } else if (type === 'infura') {
    return getInfuraProvider({ networkName })
  } else if (type === 'metamask') {
    return getMetamaskProvider({ networkName })
  }
}

export const getNetwork = getState => {
  let provider
  let { type, url, networkName, networkID } = getState().data.provider

  if (type === 'local') {
    provider = getLocalProvider({ url })
  } else if (type === 'infura') {
    provider = getInfuraProvider({ networkName })
  } else if (type === 'metamask') {
    provider = getMetamaskProvider({ networkName })
  }

  return { networkID, provider }
}

export const getInfuraProvider = ({ networkName }) => {
  return new providers.InfuraProvider(networkName)
}

export const getEtherscanProvider = ({ networkName }) => {
  return new providers.EtherscanProvider(networkName)
}

export const getFallbackProvider = ({ networkName }) => {
  let infuraProvider = new providers.InfuraProvider(networkName)
  let etherscanProvider = new providers.EtherscanProvider(networkName)
  return new providers.FallbackProvider([infuraProvider, etherscanProvider])
}

export const getLocalProvider = ({ url }) => {
  let provider = new providers.JsonRpcProvider(url, { chainId: 8888, name: 'unspecified' })
  return provider
}

export const getMetamaskProvider = ({ networkName }) => {
  let provider = new providers.Web3Provider(web3.currentProvider)
  window.provider = provider
  return provider
}

