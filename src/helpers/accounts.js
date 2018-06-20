import { getNetwork } from './providers'
import { getDefaultWalletAddress } from './wallets'

export const getDefaultAccount = async getState => {
  let { type, provider } = getNetwork(getState)
  let defaultAccount

  if (type === 'metamask') {
    let accounts = await provider.listAccounts()
    defaultAccount = accounts[0]
  } else if (type === 'infura') {
    defaultAccount = getDefaultWalletAddress(getState)
  } else if (type === 'local') {
    let accounts = await provider.listAccounts()
    defaultAccount = accounts[0]
  }

  return defaultAccount
}
