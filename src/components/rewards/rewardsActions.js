import { Rewards } from 'proof-contracts-interfaces'
import { resolve } from 'catchify'
import { getContractInstance } from '../../helpers/contracts'
import { getProvider, getProviderInfo } from '../helpers/providers'

const actions = {
  withdrawingRewards: () => ({ type: 'WITHDRAWING_REWARDS' }),
  withdrawRewardsSuccess: (receipt) => ({ type: 'WITHDRAW_REWARDS_SUCCESS', payload: receipt }),
  withdrawRewardsError: (error) => ({ type: 'WITHDRAW_REWARDS_ERROR', payload: error })
}

export const withdrawRewards = ({ sender }) => {
  return async (dispatch, getState) => {
    try {
      dispatch(actions.withdrawingRewards())

      let { networkID } = getProviderInfo(getState)
      if (typeof networkID === 'undefined') {
        return dispatch(actions.rewardsContractCallError('could not find networkID'))
      }
      let provider = getProvider(getState)
      if (typeof provider === 'undefined') {
        return dispatch(actions.rewardsContractCallError('could not get provider'))
      }

      let rewards = getContractInstance(Rewards, provider, networkID)
      let rawTx = rewards.functions.withdrawRewards({ from: sender })
      let [error, receipt] = await resolve(rawTx)
      if (error) throw new Error(error.message)

      dispatch(actions.withdrawRewardsSuccess(receipt))
    } catch (e) {
      dispatch(actions.withdrawRewardsError(e.message))
    }
  }
}
