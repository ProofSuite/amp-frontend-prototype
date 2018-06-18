import React, { Component } from 'react'
import WalletPanel from '../components/walletPanel/WalletPanel'
import WalletMenu from '../components/walletMenu/WalletMenu'

import styles from './WalletLayout.scss'

class WalletLayout extends Component {

  render () {
    return (
      <div className={styles.content}>
        <WalletPanel />
        <WalletMenu />
      </div>
    )
  }
}

export default WalletLayout
