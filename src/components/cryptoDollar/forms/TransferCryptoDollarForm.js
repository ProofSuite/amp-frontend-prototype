import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GasSettings from '../../common/GasSettings/GasSettings'
import TxNotification from '../../common/TxNotification/TxNotification'

import { InputGroup, Card, Button } from '@blueprintjs/core'

class TransferCryptoDollarForm extends Component {
  state = { sender: '', receiver: '', amount: '', gas: '', gasPrice: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value }, () => {
      let { sender, receiver, amount, gas, gasPrice } = this.state
      if (sender && receiver && amount) {
        this.props.validateTx({ amount, sender, receiver, gas, gasPrice, value })
      }
    })
  }

  handleSubmit = () => {
    let { sender, receiver, amount, gas, gasPrice } = this.state
    let { requiredGas } = this.props.txData

    gas = gas || requiredGas
    this.props.submitTx({ amount, receiver, sender, gas, gasPrice })
  }

  render () {
    const { amount, receiver, gas, gasPrice, sender } = this.state
    const { txLoading, txError } = this.props.txStatus
    const { status, statusMessage, requiredGas, hash, receipt } = this.props.txData

    return (
      <Card>
        <h3>Transfer CryptoDollar CryptoDollar</h3>
        <InputGroup
              placeholder='Message amount'
              name='amount'
              value={amount}
              onChange={this.handleChange}
            />
            <br/>
            <InputGroup
              placeholder='Sender'
              name='sender'
              value={sender}
              onChange={this.handleChange}
            />
            <br/>
            <InputGroup
              placeholder='Receiver'
              name='receiver'
              value={receiver}
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
            <br/>
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

TransferCryptoDollarForm.propTypes = {
  sendTx: PropTypes.func,
  submitTx: PropTypes.func,
  validateTx: PropTypes.func,
  txStatus: PropTypes.object,
  txData: PropTypes.object
}

export default TransferCryptoDollarForm
