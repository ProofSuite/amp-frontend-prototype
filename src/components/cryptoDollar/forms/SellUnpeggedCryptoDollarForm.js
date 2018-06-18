import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GasSettings from '../../common/GasSettings/GasSettings'
import TxNotification from '../../common/TxNotification/TxNotification'
import { InputGroup, Card, Button } from '@blueprintjs/core'

class SellUnpeggedCryptoDollarForm extends Component {
  state = { tokens: '', gas: '', gasPrice: '', sender: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value }, () => {
      let { sender, gas, gasPrice, tokens } = this.state
      if (sender && tokens) {
        this.props.validateTx({ sender, gas, gasPrice, tokens })
      }
    })
  }

  handleSubmit = () => {
    let { tokens, gas, gasPrice, sender } = this.state
    let { requiredGas } = this.props.txData

    gas = gas || requiredGas
    this.props.submitTx({ sender, tokens, gas, gasPrice })
  }

  render () {
    const { tokens, gas, gasPrice, sender } = this.state
    const { txLoading, txError } = this.props.txStatus
    const { status, statusMessage, requiredGas, hash, receipt } = this.props.txData

    return (
      <Card>
        <h3>Sell CryptoDollar (unpegged)</h3>
            <InputGroup
              placeholder='Number of tokens'
              name='tokens'
              value={tokens}
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

SellUnpeggedCryptoDollarForm.propTypes = {
  sendTx: PropTypes.func,
  submitTx: PropTypes.func,
  validateTx: PropTypes.func,
  txStatus: PropTypes.object,
  txData: PropTypes.object
}

export default SellUnpeggedCryptoDollarForm
