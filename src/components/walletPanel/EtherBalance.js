import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import styles from './WalletPanel.scss'

const EtherBalance = ({ balance }) => {
  return (
    <div className={styles.etherBalance} >
      <h2>Current Balance</h2>
      <BalanceDisplay>
        <em>{balance}</em>
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

EtherBalance.propTypes = {
  balance: PropTypes.number
}

export default EtherBalance
