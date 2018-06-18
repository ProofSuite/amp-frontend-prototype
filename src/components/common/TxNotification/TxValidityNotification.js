import React, { PureComponent } from 'react'
import { Callout } from '@blueprintjs/core'
import PropTypes from 'prop-types'

class TxValidityNotification extends PureComponent {

  renderInvalidTx (requiredGas, statusMessage) {
    return (
      <Callout intent='warning' icon='warning-sign' title={statusMessage}>
        {requiredGas && `- Required Gas: ${requiredGas}`}
      </Callout>
    )
  }

  renderValidTx (requiredGas, statusMessage) {
    return (
      <Callout intent='success' icon='info-sign' title={statusMessage}>
        Required Gas: {requiredGas}
      </Callout>
    )
  }

  render () {
    const { status, statusMessage, requiredGas } = this.props
    if (status === 'invalid') {
      return this.renderInvalidTx(requiredGas, statusMessage)
    } else if (status === 'valid') {
      return this.renderValidTx(requiredGas, statusMessage)
    } else {
      return null
    }
  }
}

TxValidityNotification.propTypes = {
  status: PropTypes.string,
  requiredGas: PropTypes.number,
  statusMessage: PropTypes.string
}

export default TxValidityNotification
