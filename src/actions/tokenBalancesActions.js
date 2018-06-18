import { getProvider, getProviderInfo } from '../helpers/providers'
import { getERC20Instance } from '../helpers/contracts'
import { formatCUSDColumn } from '../helpers/format'

export const TOKEN_BALANCES_LOADING = 'TOKEN_BALANCES_LOADING'
export const TOKEN_BALANCES_ERROR = 'TOKEN_BALANCES_ERROR'
export const UPDATE_TOKEN_BALANCE = 'UPDATE_TOKEN_BALANCE'
export const UPDATE_TOKEN_BALANCES = 'UPDATE_TOKEN_BALANCES'
export const DELETE_TOKEN_BALANCE = 'DELETE_TOKEN_BALANCE'

export const tokenBalancesLoading = () => ({
  type: TOKEN_BALANCES_LOADING
})
export const tokenBalancesError = () => ({
  type: TOKEN_BALANCES_ERROR
})
export const updateTokenBalance = (address, cryptoDollarBalance) => ({
  type: UPDATE_TOKEN_BALANCE,
  payload: { address, cryptoDollarBalance }
})
export const deleteTokenBalance = address => ({
  type: DELETE_TOKEN_BALANCE, payload: { address }
})
export const updateTokenBalances = tokenBalances => ({
  type: UPDATE_TOKEN_BALANCES,
  payload: { tokenBalances }
})

export const queryTokenBalances = (...tokenAddresses) => async (dispatch, getState) => {
  try {
    dispatch(tokenBalancesLoading())
    let { networkID } = getProviderInfo(getState)
    if (typeof networkID === 'undefined') {
      return dispatch(tokenBalancesError())
    }

    let provider = getProvider(getState)
    if (typeof provider === 'undefined') {
      return dispatch(tokenBalancesError())
    }

    let accounts = getState().accounts.addresses

    // create a 2D-array of balances[tokens][accounts]
    let tokenBalancesPromises = tokenAddresses.map(tokenAddress => {
      let erc20 = getERC20Instance(provider.web3, tokenAddress)
      let tokenBalances = accounts.map(account => {
        let balancePromise = erc20.balanceOf(account)
        return balancePromise
      })
      return tokenBalances
    })

    let tokenBalances = await Promise.all(tokenBalancesPromises.map(Promise.all))
    let formattedTokenBalances = tokenBalances.map(balances => {
      return formatCUSDColumn(balances)
    })

    let results = accounts.map((account, i) => {
      return {
        address: account,
        tokenBalances: formattedTokenBalances[account]
      }
    })

    dispatch(updateTokenBalances(results))
  } catch (error) {
    dispatch(tokenBalancesError())
  }
}
