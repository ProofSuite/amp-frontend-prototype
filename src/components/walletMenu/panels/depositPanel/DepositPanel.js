import React, { Component } from 'react'
import DepositTable from './DepositTable'

import styles from '../../WalletMenu.scss'

class DepositsPanel extends Component {

  render () {
    return (
      <div className={styles.depositsPanel}>
        <DepositTable />
      </div>
    )
  }
}

export default DepositsPanel
