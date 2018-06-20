import { utils } from 'ethers'
import { getProvider } from '../helpers/providers'
import { getDefaultAccount } from '../helpers/accounts'
import { accounts } from '../config'

export const ACCOUNTS_LOADING = 'ACCOUNTS_LOADING'
export const ACCOUNTS_ERROR = 'ACCOUNTS_ERROR'
export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const ADD_ACCOUNTS = 'ADD_ACCOUNTS'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS'

export const DEFAULT_ACCOUNT_ERROR = 'DEFAULT_ACCOUNTS_ERROR'
export const UPDATE_DEFAULT_ACCOUNT = 'UPDATE_DEFAULT_ACCOUNT'
export const UPDATE_DEFAULT_ACCOUNT_BALANCE = 'UPDATE_DEFAULT_ACCOUNT_BALANCE'

export const accountsLoading = () => ({ type: ACCOUNTS_LOADING })
export const accountsError = (error) => ({ type: ACCOUNTS_ERROR, payload: { error } })
export const addAccount = account => ({ type: ADD_ACCOUNT, payload: { account } })
export const addAccounts = accounts => ({ type: ADD_ACCOUNTS, payload: { accounts } })
export const updateAccounts = accounts => ({ type: UPDATE_ACCOUNTS, payload: { accounts } })
export const deleteAccount = account => ({ type: DELETE_ACCOUNT, payload: { account } })
export const updateDefaultAccount = address => ({ type: UPDATE_DEFAULT_ACCOUNT, payload: { address } })
export const updateDefaultAccountBalance = balance => ({ type: UPDATE_DEFAULT_ACCOUNT_BALANCE, payload: { balance } })
export const defaultAccountError = (error) => ({ type: DEFAULT_ACCOUNT_ERROR, payload: { error } })

export const queryAccounts = () => async (dispatch, getState) => {
  try {
    dispatch(accountsLoading())

    let provider = getProvider(getState)
    if (typeof provider === 'undefined') return accountsError('Could not get provider')

    dispatch(updateAccounts(accounts))
  } catch (error) {
    dispatch(accountsError(error.message))
  }
}

export const queryDefaultAccount = () => async (dispatch, getState) => {
  try {
    dispatch(accountsLoading())

    let account = await getDefaultAccount(getState)
    if (!account) return defaultAccountError('Could not get default account')

    let provider = getProvider(getState)
    if (!provider) return defaultAccountError('Could not get provider')

    dispatch(updateDefaultAccount(account))

    provider.on(account, balance => {
      dispatch(updateDefaultAccountBalance(balance))
    })
  } catch (error) {
    dispatch(accountsError(error.message))
  }
}
