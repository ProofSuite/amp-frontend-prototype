import CryptoDollarInterface from '../../../build/contracts/CryptoDollar.json'
import CryptoFiatHubInterface from '../../../build/contracts/CryptoFiatHub.json'
import RewardsInterface from '../../../build/contracts/Rewards.json'
import StoreInterface from '../../../build/contracts/Store.json'
import { getTruffleContractAddress } from '../../helpers/contracts'
import { getProvider, getProviderInfo } from '../../helpers/providers'

const actions = {
  fetchingContractAddresses: () => ({ type: 'FETCHING_CONTRACT_ADDRESSES ' }),
  fetchContractAddressesSuccess: (contracts) => ({ type: 'FETCH_CONTRACT_ADDRESSES_SUCCESS', payload: contracts }),
  fetchContractAddressesError: () => ({ type: 'FETCH_CONTRACT_ADDRESSES_ERROR' })
}

export const fetchContractAddresses = () => {
  return async (dispatch, getState) => {
    dispatch(actions.fetchingContractAddresses())

    let { networkID } = getProviderInfo(getState)
    if (typeof networkID === 'undefined') {
      return dispatch(actions.fetchingContractAddressesError())
    }

    let provider = getProvider(getState)
    if (typeof provider === 'undefined') {
      return dispatch(actions.fetchingContractAddressesError())
    }

    let contracts = [ CryptoFiatHubInterface, CryptoDollarInterface, RewardsInterface, StoreInterface ]
    let addresses = contracts.map(contract => (getTruffleContractAddress(contract, networkID)))
    let [ cryptoDollarAddress, cryptoFiatHubAddress, rewardsAddress, storeAddress ] = addresses

    let results = {
      cryptoDollar: cryptoDollarAddress,
      cryptoFiatHub: cryptoFiatHubAddress,
      rewards: rewardsAddress,
      store: storeAddress
    }

    dispatch(actions.fetchContractAddressesSuccess(results))
  }
}
