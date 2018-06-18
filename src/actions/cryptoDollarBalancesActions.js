import { CryptoDollar } from 'proof-contracts-interfaces'
import { formatCUSDColumn, formatEtherColumn } from '../helpers/format'
import { getContractInstance } from '../helpers/contracts'
import { getProvider, getProviderInfo } from '../helpers/providers'

export const CRYPTODOLLAR_BALANCES_LOADING = 'CRYPTODOLLAR_BALANCES_LOADING'
export const CRYPTODOLLAR_BALANCE_ERROR = 'CRYPTODOLLAR_BALANCE_ERROR'
export const UPDATE_CRYPTODOLLAR_BALANCE = 'UPDATE_CRYPTODOLLAR_BALANCE'
export const UPDATE_CRYPTODOLLAR_BALANCES = 'UPDATE_CRYPTODOLLAR_BALANCES'
export const DELETE_CRYPTODOLLAR_BALANCE = 'DELETE_CRYPTODOLLAR_BALANCE'

export const cryptoDollarBalancesLoading = () =>
  ({ type: CRYPTODOLLAR_BALANCES_LOADING })

export const cryptoDollarBalancesError = () =>
  ({ type: CRYPTODOLLAR_BALANCE_ERROR })

export const updateCryptoDollarBalance = (address, cryptoDollarBalance) => ({
  type: UPDATE_CRYPTODOLLAR_BALANCE,
  payload: { address, cryptoDollarBalance }
})
export const deleteCryptoDollarBalance = address => ({
  type: DELETE_CRYPTODOLLAR_BALANCE,
  payload: { address }
})
export const updateCryptoDollarBalances = cryptoDollarBalances => ({
  type: UPDATE_CRYPTODOLLAR_BALANCES,
  payload: { cryptoDollarBalances }
})

export const queryCryptoDollarBalances = cryptoDollarBalances => async (dispatch, getState) => {
  try {
    cryptoDollarBalancesLoading()

    let { networkID } = getProviderInfo(getState)
    if (typeof networkID === 'undefined') {
      return cryptoDollarBalancesError()
    }

    let provider = getProvider(getState)
    if (typeof provider === 'undefined') {
      return cryptoDollarBalancesError()
    }

    let cryptoDollar = getContractInstance(CryptoDollar, provider)
    let accounts = getState().accounts.addresses

    let cryptoDollarBalancesCalls = accounts.map(account =>
      cryptoDollar.balanceOf(account)
    )
    let reservedEtherBalancesCalls = accounts.map(account =>
      cryptoDollar.reservedEther(account)
    )
    let cryptoDollarBalances = await Promise.all(cryptoDollarBalancesCalls)
    let reservedEtherBalances = await Promise.all(reservedEtherBalancesCalls)

    cryptoDollarBalances = formatCUSDColumn(cryptoDollarBalances)
    reservedEtherBalances = formatEtherColumn(reservedEtherBalances)

    let formattedBalances = accounts.map((account, i) => {
      return {
        address: account,
        cryptoDollarBalance: cryptoDollarBalances[i],
        reservedEtherBalance: reservedEtherBalances[i]
      }
    })
    updateCryptoDollarBalances(formattedBalances)
  } catch (error) {
    cryptoDollarBalancesError()
  }
}
