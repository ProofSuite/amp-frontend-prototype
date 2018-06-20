import React, { Component } from 'react'
import WalletPanelContainer from '../components/walletPanel/WalletPanelContainer'
import WalletMenu from '../components/walletMenu/WalletMenu'

import styles from './WalletLayout.scss'

class WalletLayout extends Component {

  render () {
    return (
      <div className={styles.content}>
        <WalletPanelContainer />
        <WalletMenu />
      </div>
    )
  }
}

export default WalletLayout
