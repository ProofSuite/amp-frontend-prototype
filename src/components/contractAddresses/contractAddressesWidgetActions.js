import { CryptoDollar, CryptoFiatHub, Rewards, Store } from 'proof-contracts-interfaces'
import { getTruffleContractAddress } from '../../helpers/contracts'
import { updateContractAddresses } from '../../actions/contractAddressesActions.js'
import { getProviderInfo } from '../../helpers/providers'

export const CONTRACT_ADDRESSES_WIDGET_LOADING = 'CONTRACT_ADDRESSES_WIDGET_LOADING'
export const CONTRACT_ADDRESSES_WIDGET_ERROR = 'CONTRACT_ADDRESSES_WIDGET_ERROR'
export const CONTRACT_ADDRESSES_WIDGET_UPDATED = 'CONTRACT_ADDRESSES_WIDGET_UPDATED'

export const contractAddressesWidgetLoading = () => ({ type: CONTRACT_ADDRESSES_WIDGET_LOADING })
export const contractAddressesWidgetError = (error) => ({ type: CONTRACT_ADDRESSES_WIDGET_ERROR, payload: { error } })
export const contractAddressesWidgetUpdated = () => ({ type: CONTRACT_ADDRESSES_WIDGET_UPDATED })

export const queryContractAddresses = () => {
  return async (dispatch, getState) => {
    dispatch(contractAddressesWidgetLoading())

    let { networkID } = getProviderInfo(getState)
    if (typeof networkID === 'undefined') {
      return dispatch(contractAddressesWidgetError('could not find networkID'))
    }

    let addresses = await Promise.all([
      getTruffleContractAddress(CryptoFiatHub, networkID),
      getTruffleContractAddress(CryptoDollar, networkID),
      getTruffleContractAddress(Rewards, networkID),
      getTruffleContractAddress(Store, networkID)
    ])

    let [cryptoDollarAddress, cryptoFiatHubAddress, rewardsAddress, keyValueStoreAddress] = addresses

    let results = {
      cryptoDollar: cryptoDollarAddress,
      cryptoFiatHub: cryptoFiatHubAddress,
      rewards: rewardsAddress,
      store: keyValueStoreAddress
    }

    dispatch(updateContractAddresses(results))
    dispatch(contractAddressesWidgetUpdated())
  }
}
