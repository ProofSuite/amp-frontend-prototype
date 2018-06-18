import { getProvider, getProviderInfo } from '../helpers/providers'
import { accounts } from '../config'

export const ACCOUNTS_LOADING = 'ACCOUNTS_LOADING'
export const ACCOUNTS_ERROR = 'ACCOUNTS_ERROR'
export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const ADD_ACCOUNTS = 'ADD_ACCOUNTS'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS'

export const accountsLoading = () => ({ type: ACCOUNTS_LOADING })
export const accountsError = (error) => ({ type: ACCOUNTS_ERROR, payload: { error } })
export const addAccount = account => ({ type: ADD_ACCOUNT, payload: { account } })
export const addAccounts = accounts => ({ type: ADD_ACCOUNTS, payload: { accounts } })
export const updateAccounts = accounts => ({ type: UPDATE_ACCOUNTS, payload: { accounts } })
export const deleteAccount = account => ({ type: DELETE_ACCOUNT, payload: { account } })

export const queryAccounts = () => async (dispatch, getState) => {
  try {
    dispatch(accountsLoading())

    let { type } = getProviderInfo(getState)
    if (typeof type === 'undefined') return accountsError('Could not get provider type')

    let provider = getProvider(getState)
    if (typeof provider === 'undefined') return accountsError('Could not get provider')

    dispatch(updateAccounts(accounts))
  } catch (error) {
    dispatch(accountsError(error.message))
  }
}

