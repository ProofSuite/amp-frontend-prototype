import { combineReducers } from 'redux'
import contractAddressesReducer from './contractAddresses'
import walletBalancesReducer from './walletBalances'
import accountBalancesReducer from './accountBalances'

const ui = combineReducers({
  contractAddressesWidget: contractAddressesReducer,
  walletBalances: walletBalancesReducer,
  accountBalances: accountBalancesReducer
})

export default ui
