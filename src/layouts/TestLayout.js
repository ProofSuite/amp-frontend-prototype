import React, { Component } from 'react'

import BuyCryptoDollarTxForm from '../components/cryptoDollar/txForms/BuyCryptoDollarTxForm'
import styles from './TestLayout.scss'

class TestLayout extends Component {

  render () {
    return (
      <div className={styles.content} >
        <div className={styles.buyTxContainer}>
          <BuyCryptoDollarTxForm />
        </div>
      </div>
    )
  }
}

export default TestLayout
