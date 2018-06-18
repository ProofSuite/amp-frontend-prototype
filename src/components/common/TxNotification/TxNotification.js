import React, { PureComponent } from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import TxSuccessNotification from './TxSucessNotification'
import TxErrorNotification from './TxErrorNotification'
import TxPendingNotification from './TxPendingNotification'
import TxValidationNotification from './TxValidityNotification'

class TxNotification extends PureComponent {

  renderErrorNotification (error, hash, receipt) {
    return <TxErrorNotification error={error} hash={hash} receipt={receipt} />
  }

  renderLoader () {
    return (
      <Dimmer active inverted>
        <Loader active inverted>Loading</Loader>
      </Dimmer>
    )
  }

  renderValidationNotification (status, statusMessage, requiredGas) {
    return (
      <TxValidationNotification
        status={status}
        statusMessage={statusMessage}
        requiredGas={requiredGas}
      />
    )
  }

  renderTxPendingNotification (hash) {
    return <TxPendingNotification hash={hash} />
  }

  renderTxSuccessNotification (hash, receipt) {
    return <TxSuccessNotification hash={hash} receipt={receipt} />
  }

  render () {
    const { loading, error, hash, receipt, status, statusMessage, requiredGas } = this.props

    if (error) {
      return this.renderErrorNotification(error, hash, receipt)
    } else if (loading) {
      return this.renderLoader()
    } else if (hash && !receipt) {
      return this.renderTxPendingNotification(hash)
    } else if (hash && receipt) {
      return this.renderTxSuccessNotification(hash, receipt)
    } else if (status === 'valid' || status === 'invalid') {
      return this.renderValidationNotification(status, statusMessage, requiredGas)
    } else {
      return null
    }
  }
}

TxNotification.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  hash: PropTypes.string,
  receipt: PropTypes.object,
  status: PropTypes.string,
  statusMessage: PropTypes.string,
  requiredGas: PropTypes.number
}

export default TxNotification
