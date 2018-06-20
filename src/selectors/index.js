import * as accountSelectors from './accountSelectors'
import * as tokenSelectors from './tokenSelectors'
import * as cryptoDollarBalancesSelectors from './cryptoDollarBalancesSelectors'
import * as etherBalancesSelectors from './etherBalancesSelectors'
import * as tokenBalancesSelectors from './tokenBalancesSelectors'
import * as walletSelectors from './walletSelectors'

/**
 * Global Selectors
 * This file groups selectors on the global state. Instead of passing down
 * state.key1.key2... into the selector, these selectors accept the global state
 * object. In that way, they are completely abstracted from the state shape and
 * the calling container does not need to provide the corresponding sub-state
 * TODO Add memoization with reselect
 */

/**
 * Account Selectors
 */
export const getAccountsIsLoading = (state) => {
  return accountSelectors.getAccountsIsLoading(state.data.accounts)
}

export const getAccountsStatus = (state) => {
  return accountSelectors.getAccountsStatus(state.data.accounts)
}

export const getAccountsAddresses = (state) => {
  return accountSelectors.getAccountsAddresses(state.data.accounts)
}

export const getDefaultAccount = (state) => {
  return accountSelectors.getDefaultAccount(state.data.accounts)
}

export const getDefaultAccountAddress = (state) => {
  return accountSelectors.getDefaultAccountAddress(state.data.accounts)
}

export const getDefaultAccountFormattedBalance = (state) => {
  return accountSelectors.getDefaultAccountFormattedBalance(state.data.accounts)
}

/**
 * Balances Selectors
 */
export const getTokenBalances = (state, { addresses, symbols }) => {
  if (addresses && symbols) throw new Error('input either addresses or symbols')
  if (!addresses && !symbols) throw new Error('input either addresses or symbols')

  let accountAddresses = accountSelectors.getAccountAddresses()
  let tokenItems
  if (addresses) tokenItems = tokenSelectors.getTokensByAddresses(state, addresses)
  if (symbols) tokenItems = tokenSelectors.getTokensBySymbols(state, symbols)

  let balances = accountAddresses.map((accountAddress, i) => {
    return tokenItems.map((tokenItem, i) => {
      return {
        tokenAddress: tokenItem.address,
        tokenSymbol: tokenItem.symbol,
        tokenBalance: tokenBalancesSelectors.getTokenBalance(
          state,
          tokenItem.address,
          accountAddress
        )
      }
    })
  })

  return balances
}

export const getAccountsTokenBalances = state => {
  let addresses = accountSelectors.getAccountAddresses()
  let balances = addresses.map(address => {
    return {
      address: address,
      tokenBalances: tokenBalancesSelectors.getTokenBalancesByAccountAddress(state, address)
    }
  })

  return balances
}

export const getAccountsEtherBalances = state => {
  let addresses = accountSelectors.getAccountAddresses()
  let accountBalances = addresses.map(address => {
    return {
      address: address,
      etherBalance: etherBalancesSelectors.getEtherBalanceByAddress(state, address)
    }
  })

  return accountBalances
}

export const getAccountsCryptoDollarBalances = state => {
  let addresses = accountSelectors.getAccountAddresses()
  let accountBalances = addresses.map(address => {
    return {
      address: address,
      cryptoDollarBalance: cryptoDollarBalancesSelectors.getCryptoDollarBalanceByAddress(
        state,
        address
      )
    }
  })

  return accountBalances
}

/**
 * Account Balances Selectors
 */
export const getAccountBalances = state => {
  let accountsState = state.data.accounts
  let etherBalancesState = state.data.etherBalances
  let cryptoDollarBalancesState = state.data.cryptoDollarBalances

  let addresses = accountSelectors.getAccounts(accountsState)
  if (!addresses) return []

  let etherBalances = etherBalancesSelectors.getEtherBalances(
    etherBalancesState,
    addresses
  )
  let cryptoDollarBalances = cryptoDollarBalancesSelectors.getCryptoDollarBalances(
    cryptoDollarBalancesState,
    addresses
  )
  let reservedEtherBalances = cryptoDollarBalancesSelectors.getReservedEtherBalances(
    cryptoDollarBalancesState,
    addresses
  )

  let balances = addresses.map((address, i) => {
    return {
      address: address,
      etherBalance: etherBalances[i].etherBalance,
      cryptoDollarBalance: cryptoDollarBalances[i],
      reservedEtherBalance: reservedEtherBalances[i]
    }
  })

  return balances
}

/**
 * Wallet Balances Selectors
 */
export const getWalletBalances = state => {
  let walletsState = state.data.wallets
  let etherBalancesState = state.data.etherBalances
  let cryptoDollarBalancesState = state.data.cryptoDollarBalances

  let addresses = walletSelectors.getWallets(walletsState)
  if (!addresses) return []

  let etherBalances = etherBalancesSelectors.getEtherBalances(
    etherBalancesState,
    addresses
  )
  let cryptoDollarBalances = cryptoDollarBalancesSelectors.getCryptoDollarBalances(
    cryptoDollarBalancesState,
    addresses
  )
  let reservedEtherBalances = cryptoDollarBalancesSelectors.getReservedEtherBalances(
    cryptoDollarBalancesState,
    addresses
  )

  let balances = addresses.map((address, i) => {
    return {
      address: address,
      etherBalance: etherBalances[i].etherBalance,
      cryptoDollarBalance: cryptoDollarBalances[i],
      reservedEtherBalance: reservedEtherBalances[i]
    }
  })

  return balances
}

/**
 * Contract Addresses Selectors
 */
export const getContractAddresses = state => state.data.contractAddresses

export const getContractAddressesLoading = state => state.data.loading

export const getContractAddressesError = state => state.data.error

export const getContractAddressesWidgetLoading = state => state.ui.contractAddressesWidget.loading

export const getContractAddressesWidgetError = state => state.ui.contractAddressesWidget.error

/**
 * CryptoDollar Selectors
 */
export const getCryptoDollarContractState = state => state.data.cryptoDollar

/**
 * Rewards Selectors
 */
export const getRewardsContractState = state => state.data.rewards

export const getWithdrawStatus = state => state.data.withdraw

/**
 * Wallet Selectors
 */
export const getWalletAddresses = state => walletSelectors.getAddresses(state.data.wallets)

export const getWalletList = state => walletSelectors.getWalletList(state.data.wallets)

export const getDefaultWallet = state => walletSelectors.getDefaultWallet(state.data.wallets)

export const getWalletAuthenticationStatus = state => state.data.wallets.authentication

/**
 * Provider Selectors
 */
export const getProvider = state => state.data.provider

/**
 * Transfer Tokens Selectors
 */
export const getTransferTokensTxData = state => state.tx.transferTokens

/**
 * Send Ether Tx Data
 */
export const getSendEtherTxData = state => state.tx.sendEther

/** DEPRECATED: NEEDS TO BE REFACTORED TO WORK WITH NEW ETHERS.JS MODEL */
/**
 * Buy CryptoDollar Selectors
 */
export const getBuyTxStatus = state => {
  let { txLoading, txError } = state.tx.buyCryptoDollar
  return { txLoading, txError }
}
export const getBuyTxData = state => {
  let { status, statusMessage, hash, receipt, signature, requiredGas } = state.tx.buyCryptoDollar.tx
  return { status, statusMessage, hash, receipt, signature, requiredGas }
}
export const getBuyTxSigningStatus = state => {
  let { txSigning, txSigned, txSigningError } = state.tx.buyCryptoDollar
  return { txSigning, txSigned, txSigningError }
}

/**
 * Transfer CryptoDollar Selectors
 */
export const getSellTxStatus = state => {
  let { txLoading, txError } = state.tx.sellCryptoDollar
  return { txLoading, txError }
}
export const getSellTxData = state => {
  let { status, statusMessage, hash, receipt, signature, requiredGas } = state.tx.sellCryptoDollar.tx
  return { status, statusMessage, hash, receipt, signature, requiredGas }
}
export const getSellTxSigningStatus = state => {
  let { txSigning, txSigned, txSigningError } = state.tx.sellCryptoDollar
  return { txSigning, txSigned, txSigningError }
}

/**
 * Sell CryptoDollar Selectors
 */
export const getSellUnpeggedTxStatus = state => {
  let { txLoading, txError } = state.tx.sellUnpeggedCryptoDollar
  return { txLoading, txError }
}
export const getSellUnpeggedTxData = state => {
  let { status, statusMessage, hash, receipt, signature, requiredGas } = state.tx.sellUnpeggedCryptoDollar.tx
  return { status, statusMessage, hash, receipt, signature, requiredGas }
}
export const getSellUnpeggedTxSigningStatus = state => {
  let { txSigning, txSigned, txSigningError } = state.tx.sellUnpeggedCryptoDollar
  return { txSigning, txSigned, txSigningError }
}

/**
 * Sell CryptoDollar Selectors
 */
export const getTransferTxStatus = state => {
  let { txLoading, txError } = state.tx.sellCryptoDollar
  return { txLoading, txError }
}
export const getTransferTxData = state => {
  let { status, statusMessage, hash, receipt, signature, requiredGas } = state.tx.sellCryptoDollar.tx
  return { status, statusMessage, hash, receipt, signature, requiredGas }
}
export const getTransferTxSigningStatus = state => {
  let { txSigning, txSigned, txSigningError } = state.tx.sellCryptoDollar
  return { txSigning, txSigned, txSigningError }
}

/**
 * Get Withdraw Rewards Status
 */
export const getWithdrawRewardsTxStatus = state => {
  let { txLoading, txError } = state.tx.sellCryptoDollar
  return { txLoading, txError }
}
export const getWithdrawRewardsTxData = state => {
  let { status, statusMessage, hash, receipt, signature, requiredGas } = state.tx.sellCryptoDollar.tx
  return { status, statusMessage, hash, receipt, signature, requiredGas }
}
export const getWithdrawRewardsTxSigningStatus = state => {
  let { txSigning, txSigned, txSigningError } = state.tx.sellCryptoDollar
  return { txSigning, txSigned, txSigningError }
}
