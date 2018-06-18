import CryptoDollarInterface from '../../../build/contracts/CryptoDollar.json'
import { updateCryptoDollarBalances } from '../../actions/cryptoDollarBalancesActions.js'
import { updateEtherBalances } from '../../actions/etherBalancesActions.js'
import { getContractInstance } from '../../helpers/contracts'
import { formatEtherColumn, formatCUSDColumn } from '../../helpers/format'
import { getProvider, getProviderInfo } from '../helpers/providers'

export const CRYPTOFIAT_BALANCES_WIDGET_LOADING = 'CRPYTOFIAT_BALANCES_WIDGET_LOADING'
export const CRYPTOFIAT_BALANCES_WIDGET_ERROR = 'CRPYTOFIAT_BALANCES_WIDGET_ERROR'
export const CRYPTOFIAT_BALANCES_WIDGET_UPDATED = 'CRPYTOFIAT_BALANCES_WIDGET_UPDATED'

export const cryptoFiatBalancesWidgetLoading = ({ type: CRYPTOFIAT_BALANCES_WIDGET_LOADING })
export const cryptoFiatBalancesWidgetUpdated = ({ type: CRYPTOFIAT_BALANCES_WIDGET_UPDATED })
export const cryptoFiatBalancesWidgetError = (error) =>
  ({ type: CRYPTOFIAT_BALANCES_WIDGET_ERROR, payload: { error } })

export const queryCryptoFiatBalances = cryptoDollarBalances => async (dispatch, getState) => {
  try {
    dispatch(cryptoFiatBalancesWidgetLoading)

    let { networkID } = getProviderInfo(getState)
    if (typeof networkID === 'undefined') {
      return dispatch(cryptoFiatBalancesWidgetError('could not find networkID'))
    }
    let provider = getProvider(getState)
    if (typeof provider === 'undefined') {
      return dispatch(cryptoFiatBalancesWidgetError('could not get provider'))
    }

    let accounts = getState().data.accounts.addresses
    let cryptoDollar = await getContractInstance(CryptoDollarInterface, provider)

    let cryptoDollarBalancesCalls = accounts.map((account) => cryptoDollar.balanceOf(account))
    let reservedEtherBalancesCalls = accounts.map((account) => cryptoDollar.reservedEther(account))
    let etherBalancesCalls = accounts.map((account) => provider.getBalance(account))

    let cryptoDollarBalances = await Promise.all(cryptoDollarBalancesCalls)
    let reservedEtherBalances = await Promise.all(reservedEtherBalancesCalls)
    let etherBalances = await Promise.all(etherBalancesCalls)

    cryptoDollarBalances = formatCUSDColumn(cryptoDollarBalances)
    reservedEtherBalances = formatEtherColumn(reservedEtherBalances)
    etherBalances = formatEtherColumn(etherBalances)

    let formattedCryptoDollarBalances = accounts.map((account, i) => {
      return {
        address: account,
        cryptoDollarBalance: cryptoDollarBalances[i],
        reservedEtherBalance: reservedEtherBalances[i]
      }
    })

    let formattedEtherBalances = accounts.map((account, i) => {
      return {
        address: account,
        etherBalance: etherBalances[i]
      }
    })

    dispatch(updateCryptoDollarBalances(formattedCryptoDollarBalances))
    dispatch(updateEtherBalances(formattedEtherBalances))
    dispatch(cryptoFiatBalancesWidgetUpdated)
  } catch (error) {
    return dispatch(cryptoFiatBalancesWidgetError(error.message))
  }
}
