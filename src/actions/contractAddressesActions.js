import { CryptoDollar, CryptoFiatHub, Rewards, Store } from 'proof-contracts-interfaces'
import { getTruffleContractAddress } from '../helpers/contracts'
import { getProviderInfo } from '../helpers/providers'

export const CONTRACT_ADDRESSES_LOADING = 'CONTRACT_ADDRESSES_LOADING'
export const CONTRACT_ADDRESSES_ERROR = 'CONTRACT_ADDRESSES_ERROR'
export const UPDATE_CONTRACT_ADDRESSES = 'UPDATE_CONTRACT_ADDRESSES'

export const contractAddressesLoading = () => ({ type: CONTRACT_ADDRESSES_LOADING })

export const contractAddressesError = error => ({
  type: CONTRACT_ADDRESSES_ERROR,
  payload: { error }
})

export const updateContractAddresses = contracts => ({
  type: UPDATE_CONTRACT_ADDRESSES,
  payload: { contracts }
})

export const queryContractAddresses = () => async (dispatch, getState) => {
  dispatch(contractAddressesLoading())

  let { networkID } = getProviderInfo(getState)
  if (typeof networkID === 'undefined') {
    return dispatch(contractAddressesError('could not retrieve network ID'))
  }

  let addresses = await Promise.all([
    getTruffleContractAddress(CryptoFiatHub, networkID),
    getTruffleContractAddress(CryptoDollar, networkID),
    getTruffleContractAddress(Rewards, networkID),
    getTruffleContractAddress(Store, networkID)
  ])

  let [cryptoDollarAddress, cryptoFiatHubAddress, rewardsAddress, keyValueStoreAddress] = addresses

  let contracts = {
    cryptoDollar: cryptoDollarAddress,
    cryptoFiatHub: cryptoFiatHubAddress,
    rewards: rewardsAddress,
    store: keyValueStoreAddress
  }

  dispatch(updateContractAddresses({ contracts }))
}
