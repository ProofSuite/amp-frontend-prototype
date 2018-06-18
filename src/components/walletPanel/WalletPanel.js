import React, { Component } from 'react'
import { Card } from '@blueprintjs/core'
import Address from './Address'
import EtherBalance from './EtherBalance'
import PrivateKey from './PrivateKey'

import styles from '../../layouts/WalletLayout.scss'

class WalletPanel extends Component {

  state = {
    showPrivateKey: false
  }

  render () {
    return (
      <div className={styles.walletPanel}>
        <Card className={styles.walletPanelCard} >
          <EtherBalance />
          <Address />
          <PrivateKey />
        </Card>
      </div>
    )
  }
}

export default WalletPanel
