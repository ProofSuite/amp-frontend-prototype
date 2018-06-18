import { Rewards } from 'proof-contracts-interfaces'
import accounting from 'accounting-js'
import { getContractInstance } from '../../helpers/contracts'
import { getProvider, getProviderInfo } from '../../helpers/providers'

export const QUERYING_REWARDS_STATE = 'QUERYING_REWARDS_STATE'
export const QUERY_REWARDS_STATE_ERROR = 'QUERY_REWARDS_STATE_ERROR'
export const QUERY_REWARDS_STATE_SUCCESS = 'QUERY_REWARDS_STATE_SUCCESS'

export const queryingRewardsContract = () => ({ type: QUERYING_REWARDS_STATE })
export const rewardsContractCallError = (error) => ({ type: QUERY_REWARDS_STATE_ERROR, payload: { error } })
export const rewardsContractCallSuccess = (data) => ({ type: QUERY_REWARDS_STATE_SUCCESS, payload: { data } })

export const queryRewardsContractState = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(queryingRewardsContract())

      let { networkID } = getProviderInfo(getState)
      if (typeof networkID === 'undefined') {
        return dispatch(rewardsContractCallError('could not find networkID'))
      }
      let provider = getProvider(getState)
      if (typeof provider === 'undefined') {
        return dispatch(rewardsContractCallError('could not get provider'))
      }

      let rewards = getContractInstance(Rewards, provider, networkID)
      let rewardsData = await Promise.all([
        rewards.getCurrentPoolIndex(),
        rewards.getCurrentEpoch(),
        rewards.getCurrentPoolBalance()
      ])
      let [currentPoolIndex, currentEpoch, currentPoolBalance] = rewardsData
      let data = {
        currentPoolIndex: currentPoolIndex.toNumber(),
        currentEpoch: currentEpoch.toNumber(),
        currentPoolBalance: accounting.formatMoney(currentPoolBalance / 10e18, { symbol: 'ETH', format: '%v %s' })
      }

      dispatch(rewardsContractCallSuccess(data))
    } catch (error) {
      dispatch(rewardsContractCallError(error.message))
    }
  }
}
