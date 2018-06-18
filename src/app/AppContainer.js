import { connect } from 'react-redux'
import App from './App'

import { queryAccounts } from '../actions/accountActions'
import { getAccountsAddresses } from '../selectors/'

const mapStateToProps = state => ({
  accounts: getAccountsAddresses(state)
})

const mapDispatchToProps = {
  queryAccounts
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
