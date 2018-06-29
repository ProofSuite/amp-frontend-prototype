import { utils } from 'ethers'

export const getAccountsIsLoading = state => state.status.loading
export const getAccountsStatus = state => state.status
export const getAccountsAddresses = state => state.addresses

export const getDefaultAccount = state => state.defaultAccount
export const getDefaultAccountAddress = state => state.defaultAccount.address
export const getDefaultAccountBalance = state => state.defaultAccount.balance

export const getDefaultAccountFormattedBalance = state => {
  let balance = state.defaultAccount.balance
  let formattedBalance

  balance
  ? formattedBalance = utils.formatEther(balance, { commify: true }) + utils.etherSymbol
  : formattedBalance = '...'

  return formattedBalance
}
