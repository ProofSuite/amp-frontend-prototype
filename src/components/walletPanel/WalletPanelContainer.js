import { connect } from 'react-redux'
import WalletPanel from './WalletPanel'

import { queryDefaultAccount } from '../../actions/accountActions'
import { getDefaultAccountAddress, getDefaultAccountFormattedBalance } from '../../selectors'

const mapStateToProps = state => ({
  defaultAccountAddress: getDefaultAccountAddress(state),
  defaultAccountBalance: getDefaultAccountFormattedBalance(state)
})

const mapDispatchToProps = {
  queryDefaultAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPanel)
