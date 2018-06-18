import React from 'react'
import { Callout, Intent, Spinner } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import styles from './TxPendingNotification.css'

const TxPendingNotification = ({ hash }) => (
  <Callout
    intent={Intent.SUCCESS}
    icon='info-sign'
    title='Transaction in progress'
  >
    <div className={styles.content}>
    <p>Transaction Hash: {hash}</p>
    <Spinner intent={Intent.SUCCESS} />
    </div>
  </Callout>
)

TxPendingNotification.propTypes = {
  receipt: PropTypes.object,
  hash: PropTypes.string
}

export default TxPendingNotification
