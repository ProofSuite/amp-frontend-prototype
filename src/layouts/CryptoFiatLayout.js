import React, { Component } from 'react'
import { connect } from 'react-redux'
import WalletBalancesContainer from '../components/walletBalances/WalletBalancesContainer'
import CryptoDollarContainer from '../components/cryptoDollar/CryptoDollarContainer'
import ContractAddressesWidgetContainer from '../components/contractAddresses/ContractAddressesWidgetContainer'
import RewardsFormContainer from '../components/rewards/RewardsContainer'
import PropTypes from 'prop-types'
import LoaderLayout from './LoaderLayout'

import { queryAccounts } from '../actions/accountActions'
import { queryWalletBalances } from '../actions/walletBalancesActions'

import styles from './CryptoFiatLayout.scss'
import { getAccountsIsLoading } from '../selectors/'

class CryptoFiatLayout extends Component {

  componentWillMount () {
    this.props.queryAccounts()
    this.props.queryWalletBalances()
  }

  renderCryptoFiatLayout () {
    return (
      <div className={styles.app}>
          <div className={styles.cryptoDollar}>
            <CryptoDollarContainer />
          </div>
          <div className={styles.rewards}>
            <RewardsFormContainer />
          </div>
          <div className={styles.walletBalances}>
            <WalletBalancesContainer />
          </div>
          <div className={styles.contractAddresses}>
            <ContractAddressesWidgetContainer />
          </div>
      </div>
    )
  }

  renderLoading () {
    return <LoaderLayout />
  }

  componentWillReceiveProps ({ loading }) {
    this.setState({ loading })
  }

  render () {
    return (
      <div>
      {
        this.props.loading
        ? this.renderLoading()
        : this.renderCryptoFiatLayout()
      }
      </div>

    )
  }
  }

const mapStateToProps = state => ({
  loading: getAccountsIsLoading(state)
})

const mapDispatchToProps = {
  queryAccounts,
  queryWalletBalances
}

CryptoFiatLayout.propTypes = {
  loading: PropTypes.bool,
  queryAccounts: PropTypes.func,
  queryWalletBalances: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoFiatLayout)
