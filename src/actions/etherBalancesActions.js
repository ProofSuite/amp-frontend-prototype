import { formatEtherColumn } from '../helpers/format'
import { getProviderInfo, getProvider } from '../helpers/providers'

export const ETHER_BALANCES_LOADING = 'ETHER_BALANCES_LOADING'
export const ETHER_BALANCES_ERROR = 'ETHER_BALANCES_ERROR'
export const UPDATE_ETHER_BALANCE = 'UPDATE_ETHER_BALANCE'
export const UPDATE_ETHER_BALANCES = 'UPDATE_ETHER_BALANCES'
export const DELETE_ETHER_BALANCE = 'DELETE_ETHER_BALANCE'

export const etherBalancesLoading = () => dispatch =>
  dispatch({ type: ETHER_BALANCES_LOADING })

export const etherBalancesError = () => dispatch =>
  dispatch({ type: ETHER_BALANCES_ERROR })

export const updateEtherBalance = (address, etherBalance) => dispatch =>
  dispatch({ type: UPDATE_ETHER_BALANCE, payload: { address, etherBalance } })

export const deleteEtherBalance = address => dispatch =>
  dispatch({ type: DELETE_ETHER_BALANCE, payload: { address } })

export const updateEtherBalances = etherBalances => dispatch =>
  dispatch({ type: UPDATE_ETHER_BALANCES, payload: { etherBalances } })

export const queryEtherBalances = cryptoDollarBalances => async (dispatch, getState) => {
  try {
    etherBalancesLoading()

    let { networkID } = getProviderInfo(getState)
    if (typeof networkID === 'undefined') {
      return etherBalancesError()
    }

    let provider = getProvider(getState)
    if (typeof provider === 'undefined') {
      return etherBalancesError()
    }

    let accounts = getState().accounts.addresses
    let etherBalancesCalls = accounts.map((account) => provider.getBalance(account))
    let etherBalances = await Promise.all(etherBalancesCalls)
    let balances = formatEtherColumn(etherBalances)

    let formattedBalances = accounts.map((account, i) => {
      return {
        address: account,
        etherBalance: balances[i]
      }
    })
    updateEtherBalances(formattedBalances)
  } catch (error) {
    etherBalancesError()
  }
}
