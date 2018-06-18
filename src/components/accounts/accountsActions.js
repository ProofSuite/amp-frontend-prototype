import CryptoDollar from '../../../build/contracts/CryptoDollar.json'
import { formatEtherColumn, formatCUSDColumn } from '../../helpers/format'
import { accountsError } from '../../actions/accountActions'
import { getProvider, getProviderInfo } from '../../helpers/providers'
import { getContractInstance } from '../../helpers/contracts'

const actions = {
  fetchingAddresses: () => ({ type: 'FETCHING_ADDRESSES ' }),
  fetchAddressesSucess: () => ({ type: 'FETCH_ADDRESSES_SUCCESS' }),
  fetchingAccounts: () => ({ type: 'FETCHING_ACCOUNTS' }),
  fetchAccountsSuccess: (payload) => ({ type: 'FETCH_ACCOUNTS_SUCCESS', payload }),
  fetchAccountsError: () => ({ type: 'FETCH_ACCOUNTS_ERROR' })
}

export const fetchAccounts = () => {
  return async (dispatch, getState) => {
    dispatch(actions.fetchingAccounts())

    let { networkID } = getProviderInfo(getState)
    let provider = getProvider(getState)
    if (typeof provider === 'undefined') return accountsError()

    let accounts = await provider.listAccounts()
    let cryptoDollar = getContractInstance(CryptoDollar, provider, networkID)

    let etherBalancesCalls = accounts.map((account) => provider.getBalance(account))
    let etherBalances = await Promise.all(etherBalancesCalls)
    etherBalances = formatEtherColumn(etherBalances)

    let cryptoDollarBalancesCalls = accounts.map((account) => cryptoDollar.balanceOf(account))
    let cryptoDollarBalances = await Promise.all(cryptoDollarBalancesCalls)
    cryptoDollarBalances = formatCUSDColumn(cryptoDollarBalances)

    let reservedEtherCalls = accounts.map((account) => cryptoDollar.reservedEther(account))
    let reservedEtherBalances = await Promise.all(reservedEtherCalls)
    reservedEtherBalances = formatEtherColumn(reservedEtherBalances)

    let results = accounts.map((account, i) => {
      return {
        address: account,
        etherBalance: etherBalances[i],
        cryptoDollarBalance: cryptoDollarBalances[i],
        reservedEtherBalance: reservedEtherBalances[i]
      }
    })

    dispatch(actions.fetchAccountsSuccess(results))
  }
}
