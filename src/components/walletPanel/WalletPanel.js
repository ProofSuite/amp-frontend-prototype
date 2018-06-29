import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from '@blueprintjs/core'
import Address from './Address'
import EtherBalance from './EtherBalance'
import PrivateKey from './PrivateKey'

import styles from '../../layouts/WalletLayout.scss'

class WalletPanel extends Component {

  componentDidMount () {
    this.props.queryDefaultAccount()
  }

  render () {
    let { defaultAccountBalance, defaultAccountAddress } = this.props
    console.log(defaultAccountBalance, defaultAccountAddress)

    return (
      <div className={styles.walletPanel}>
        <Card className={styles.walletPanelCard} >
          <EtherBalance balance={defaultAccountBalance} />
          <Address address={defaultAccountAddress} />
          <PrivateKey />
        </Card>
      </div>
    )
  }
}

WalletPanel.propTypes = {
  defaultAccountAddress: PropTypes.string,
  defaultAccountBalance: PropTypes.string,
  queryDefaultAccount: PropTypes.func
}

export default WalletPanel
