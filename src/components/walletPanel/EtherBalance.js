import React from 'react'
import styled from 'styled-components'

import styles from './WalletPanel.scss'

const EtherBalance = () => {
  return (
    <div className={styles.etherBalance} >
      <h2>Current Balance</h2>
      <BalanceDisplay>
        <em>1.62 ETH</em>
      </BalanceDisplay>
    </div>
  )
}

const BalanceDisplay = styled.div`
  display: flex;
  justify-content: center;
  font-size: 40px;
  padding-top: 30px;
`

export default EtherBalance
