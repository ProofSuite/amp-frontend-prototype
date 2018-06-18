import { CryptoFiatHub, CryptoDollar } from 'proof-contracts-interfaces'
import { getContractInstance } from '../helpers/contracts'
import { formatEtherColumn } from '../helpers/format'
import { getProvider, getProviderInfo } from '../helpers/providers'

export const QUERYING_CRYPTODOLLAR_STATE = 'QUERYING_CRYPTODOLLAR_STATE'
export const QUERY_CRYPTODOLLAR_STATE_SUCCESS = 'QUERY_CRYPTODOLLAR_STATE_SUCCESS'
export const QUERY_CRYPTODOLLAR_STATE_ERROR = 'QUERY_CRYPTODOLLAR_STATE_ERROR'

export const queryingCryptoDollarState = () => ({ type: QUERYING_CRYPTODOLLAR_STATE })

export const queryCryptoDollarStateSuccess = data => ({
  type: QUERY_CRYPTODOLLAR_STATE_SUCCESS,
  payload: { data }
})
export const queryCryptoDollarStateError = error => ({
  type: QUERY_CRYPTODOLLAR_STATE_ERROR,
  payload: { error }
})

export const queryCryptoDollarContractState = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(queryingCryptoDollarState())

      let { networkID } = getProviderInfo(getState)
      if (typeof networkID === 'undefined') {
        return dispatch(queryCryptoDollarStateError('could not find networkID'))
      }
      let provider = getProvider(getState)
      if (typeof provider === 'undefined') {
        return dispatch(queryCryptoDollarStateError('could not get provider'))
      }

      let cryptoDollar = getContractInstance(CryptoDollar, provider, networkID)
      let cryptoFiatHub = getContractInstance(CryptoFiatHub, provider, networkID)
      let exchangeRate = 87537

      let contractData = await Promise.all([
        cryptoDollar.functions.totalSupply(),
        cryptoFiatHub.totalOutstanding(exchangeRate),
        cryptoFiatHub.buffer(exchangeRate),
        cryptoFiatHub.contractBalance()
      ])

      let [totalSupply, totalOutstanding, buffer, contractBalance] = formatEtherColumn(contractData)
      let data = { totalSupply, totalOutstanding, buffer, contractBalance }
      dispatch(queryCryptoDollarStateSuccess(data))
    } catch (error) {
      console.log(error)
      dispatch(queryCryptoDollarStateError(error.message))
    }
  }
}
