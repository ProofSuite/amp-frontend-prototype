import React from 'react'
import { Callout, Intent } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import TransactionReceipt from './TransactionReceipt'

const TxSuccessNotification = ({ receipt, hash }) => (
  <Callout
    intent={Intent.SUCCESS}
    icon='info-sign'
    title='Transaction successful!'
  >
    <p>Transaction Hash: {hash}</p>
    <TransactionReceipt receipt={receipt} />
  </Callout>
)

TxSuccessNotification.propTypes = {
  receipt: PropTypes.object,
  hash: PropTypes.string
}

export default TxSuccessNotification
