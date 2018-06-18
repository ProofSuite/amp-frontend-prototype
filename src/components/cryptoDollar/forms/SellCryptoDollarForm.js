import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GasSettings from '../../common/GasSettings/GasSettings'
import TxNotification from '../../common/TxNotification/TxNotification'
import { Card, InputGroup, Button } from '@blueprintjs/core'

class SellCryptoDollarForm extends Component {
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
        <InputGroup
          large={true}
          icon='filter'
          placeholder='Number of tokens'
          value={tokens}
          onChange={this.handleChange}
        />
        <br/>
        <InputGroup
          large={true}
          icon='filter'
          placeholder='Sender'
          value={sender}
          onChange={this.handleChange}
        />
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

SellCryptoDollarForm.propTypes = {
  buyCryptoDollar: PropTypes.func,
  sendTx: PropTypes.func,
  submitTx: PropTypes.func,
  validateTx: PropTypes.func,
  txStatus: PropTypes.object,
  txData: PropTypes.object
}

export default SellCryptoDollarForm
