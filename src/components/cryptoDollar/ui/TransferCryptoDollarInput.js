import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GasSettings from '../../common/GasSettings/GasSettings'
import TxNotification from '../../common/TxNotification'
import { Card, InputGroup, Button } from '@blueprintjs/core'

class TransferCryptoDollarInput extends Component {

  state = { sender: '', receiver: '', amount: '', gas: '', gasPrice: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { sender, receiver, amount, gas, gasPrice } = this.state
    this.props.transferCryptoDollar({ amount, receiver, sender, gas, gasPrice })
  }

  render () {
    const { amount, receiver, sender, gas, gasPrice } = this.state
    const { error, receipt, txHash, loading } = this.props.status

    return (
      <Card>
        <h3>Transfer CryptoDollar</h3>
            <InputGroup
              placeholder='Message amount'
              name='amount'
              value={amount}
              onChange={this.handleChange}
            />
            <InputGroup
              placeholder='Sender'
              name='sender'
              value={sender}
              onChange={this.handleChange}
            />
            <InputGroup
              placeholder='Receiver'
              name='receiver'
              value={receiver}
              onChange={this.handleChange}
            />
            <GasSettings
              gas={gas}
              gasPrice={gasPrice}
              handleChange={this.handleChange}
            />
            <TxNotification
              loading={loading}
              error={error}
              txHash={txHash}
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

TransferCryptoDollarInput.propTypes = {
  transferCryptoDollar: PropTypes.func,
  status: PropTypes.object
}

export default TransferCryptoDollarInput
