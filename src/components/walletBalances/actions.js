import { CryptoDollar } from 'proof-contracts-interfaces'
import { getContractInstance } from '../../helpers/contracts'
import { updateCryptoDollarBalances } from '../../actions/cryptoDollarBalancesActions'
import { updateEtherBalances } from '../../actions/etherBalancesActions'
import { formatEtherColumn, formatCUSDColumn } from '../../helpers/format'
import { getProvider, getProviderInfo } from '../../helpers/providers'

export const WALLET_BALANCES_LOADING = 'WALLET_BALANCES_LOADING'
export const WALLET_BALANCES_UPDATED = 'WALLET_BALANCES_UPDATED'
export const WALLET_BALANCES_ERROR = 'WALLET_BALANCES_ERROR'

export const walletBalancesLoading = () => ({ type: WALLET_BALANCES_LOADING })
export const walletBalancesUpdated = () => ({ type: WALLET_BALANCES_UPDATED })
export const walletBalancesError = (error) => ({ type: WALLET_BALANCES_ERROR, payload: { error } })

export const queryWalletBalances = walletBalances => async (dispatch, getState) => {
  try {
    dispatch(walletBalancesLoading())

    let { networkID } = getProviderInfo(getState)
    if (typeof networkID === 'undefined') {
      return dispatch(walletBalancesError('could not find networkID'))
    }
    let provider = getProvider(getState)
    if (typeof provider === 'undefined') {
      return dispatch(walletBalancesError('could not get provider'))
    }

    let wallets = getState().data.wallets.allAddresses
    let cryptoDollar = getContractInstance(CryptoDollar, provider, networkID)

    let cryptoDollarBalancesCalls = wallets.map((wallet) => cryptoDollar.balanceOf(wallet))
    let reservedEtherBalancesCalls = wallets.map((wallet) => cryptoDollar.reservedEther(wallet))
    let etherBalancesCalls = wallets.map((wallet) => provider.getBalance(wallet))

    let cryptoDollarBalances = await Promise.all(cryptoDollarBalancesCalls)
    let reservedEtherBalances = await Promise.all(reservedEtherBalancesCalls)
    let etherBalances = await Promise.all(etherBalancesCalls)

    cryptoDollarBalances = formatCUSDColumn(cryptoDollarBalances)
    reservedEtherBalances = formatEtherColumn(reservedEtherBalances)
    etherBalances = formatEtherColumn(etherBalances)

    let formattedCryptoDollarBalances = wallets.map((wallet, i) => {
      return {
        address: wallet,
        cryptoDollarBalance: cryptoDollarBalances[i],
        reservedEtherBalance: reservedEtherBalances[i]
      }
    })

    let formattedEtherBalances = wallets.map((wallet, i) => {
      return {
        address: wallet,
        etherBalance: etherBalances[i]
      }
    })

    dispatch(updateCryptoDollarBalances(formattedCryptoDollarBalances))
    dispatch(updateEtherBalances(formattedEtherBalances))
    dispatch(walletBalancesUpdated())
  } catch (error) {
    console.log(error)
    return dispatch(walletBalancesError(error.message))
  }
}
