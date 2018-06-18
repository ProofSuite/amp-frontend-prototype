import React from 'react'
import { Callout, Intent } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import TransactionReceipt from './TransactionReceipt'

import styled from 'styled-components'

const TxErrorNotification = ({ error, receipt }) => (
  <NotificationContainer>
    <Callout title='Transaction Failed' icon='info-sign' intent={Intent.DANGER}>
      <p>{error}</p>
      {receipt && <TransactionReceipt receipt={receipt} />}
    </Callout>
  </NotificationContainer>
)

const NotificationContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 30px;
`

TxErrorNotification.propTypes = {
  error: PropTypes.string,
  txHash: PropTypes.string,
  receipt: PropTypes.object
}

export default TxErrorNotification
