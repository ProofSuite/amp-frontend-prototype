import React, { Component } from 'react'
import { InputGroup, Button, Card } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import GasSettings from '../../common/GasSettings/GasSettings'
import TxNotification from '../../common/TxNotification/TxNotification'

class BuyCryptoDollarForm extends Component {
  state = { value: '', gas: '', gasPrice: '', sender: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value }, () => {
      let { sender, gas, gasPrice, value } = this.state
      if (sender && value) {
        this.props.validateTx({ sender, gas, gasPrice, value })
      }
    })
  }

  handleSubmit = () => {
    let { value, gas, gasPrice, sender } = this.state
    let { requiredGas } = this.props.txData

    gas = gas || requiredGas
    this.props.submitTx({ sender, value, gas, gasPrice })
  }

  render () {
    const { value, gas, gasPrice, sender } = this.state
    const { txLoading, txError } = this.props.txStatus
    const { status, statusMessage, requiredGas, hash, receipt } = this.props.txData

    return (
      <Card>
          <InputGroup
            large={true}
            icon='filter'
            placeholder='Message Value'
            value={value}
            onChange={this.handleChange}
          />
          <br/>
          <InputGroup
            large={true}
            placeholder='Message Sender'
            value={sender}
            onChange={this.handleChange}
          />
          <br/>
          <GasSettings
            gas={gas}
            requiredGas={requiredGas}
            gasPrice={gasPrice}
            handleChange={this.handleChange}
          />
          <TxNotification
            status={status}
            requiredGas={requiredGas}
            statusMessage={statusMessage}
            loading={txLoading}
            error={txError}
            hash={hash}
            receipt={receipt}
          />
          <Button
            text='Send Transaction'
            intent='primary'
            large={true}
            type='submit'
            fill
            onClick={this.handleSubmit}
          />
      </Card>
    )
  }
}

BuyCryptoDollarForm.propTypes = {
  buyCryptoDollar: PropTypes.func,
  sendTx: PropTypes.func,
  submitTx: PropTypes.func,
  validateTx: PropTypes.func,
  txStatus: PropTypes.object,
  txData: PropTypes.object
}

export default BuyCryptoDollarForm
