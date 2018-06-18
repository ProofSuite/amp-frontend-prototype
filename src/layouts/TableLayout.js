import React, { Component } from 'react'
import DepositTable from '../components/common/Tables/DepositTable/Table'

import styles from './SettingsLayout.scss'

class TableLayout extends Component {

  render () {
    return (
      <div className={styles.content}>
        <DepositTable/>
      </div>
    )
  }
}

export default TableLayout
