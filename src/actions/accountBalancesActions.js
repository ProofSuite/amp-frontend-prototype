import { CryptoDollar } from 'proof-contracts-interfaces'
import { updateCryptoDollarBalances } from './cryptoDollarBalancesActions'
import { updateEtherBalances } from './etherBalancesActions'
import { queryCryptoDollarStateError } from './cryptoDollarActions'

import { formatEtherColumn, formatCUSDColumn } from '../helpers/format'
import { getContractInstance } from '../helpers/contracts'
import { getProvider, getProviderInfo } from '../helpers/providers'

export const ACCOUNT_BALANCES_LOADING = 'ACCOUNT_BALANCES_LOADING'
export const ACCOUNT_BALANCES_UPDATED = 'ACCOUNT_BALANCES_UPDATED'
export const ACCOUNT_BALANCES_ERROR = 'ACCOUNT_BALANCES_ERROR'

export const accountBalancesLoading = () => ({ type: ACCOUNT_BALANCES_LOADING })
export const accountBalancesUpdated = () => ({ type: ACCOUNT_BALANCES_UPDATED })
export const accountBalancesError = (error) => ({ type: ACCOUNT_BALANCES_ERROR, payload: { error } })

export const queryAccountBalances = (accountBalances) => {
  return async (dispatch, getState) => {
    try {
      dispatch(accountBalancesLoading())

      let { networkID } = getProviderInfo(getState)
      if (typeof networkID === 'undefined') {
        return dispatch(queryCryptoDollarStateError('could not find networkID'))
      }

      let provider = getProvider(getState)
      if (typeof provider === 'undefined') {
        return dispatch(accountBalancesError('Could not instantiate web3'))
      }

      let accounts = getState().data.accounts.addresses
      let cryptoDollar = getContractInstance(CryptoDollar, provider, networkID)
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
      dispatch(accountBalancesUpdated())
    } catch (error) {
      return dispatch(accountBalancesError(error.message))
    }
  }
}
