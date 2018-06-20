import React, { Component } from 'react'
import { InputGroup, Button, ControlGroup, Label } from '@blueprintjs/core'
import PropTypes from 'prop-types'

import GasSettings from '../../../../common/GasSettings/GasSettings'
import TxNotification from '../../../../common/TxNotification/TxNotification'
import TokenSelect from '../../../../common/Selects/TokenSelect'

const tokens = [
  { name: 'ETH', address: '0x0' },
  { name: 'EOS', address: '0x8d0a722b76c0dcb91bf62334afd11f925c0adb95' },
  { name: 'WETH', address: '0x2eb24432177e82907de24b7c5a6e0a5c03226135' },
  { name: 'ZRX', address: '0xc73eec564e96e6653943d6d0e32121d455917653' }
].map((m, index) => ({ ...m, rank: index + 1 }))

class SendEtherForm extends Component {

  state = {
    token: tokens[0],
    amount: null,
    receiver: null,
    gas: '',
    gasPrice: '',
    sender: ''
  }

  handleChange = (e) => {
    const { value, name } = e.target

    if (this.state.token.address === '0x0') {
      this.setState({ [name]: value }, () => {
        let { amount, receiver, gas, gasPrice } = this.state
        if (amount && receiver) {
          this.props.validateEtherTx({ amount, receiver, gas, gasPrice })
        }
      })
    } else {
      this.setState({ [name]: value }, () => {
        let { amount, receiver, gas, gasPrice, token } = this.state
        if (token && amount && receiver) {
          this.props.validateTransferTokensTx({ amount, receiver, gas, gasPrice, tokenAddress: token.address })
        }
      })
    }
  }

  handleTokenChange = (token) => {
    this.setState({ token: token }, () => {
      if (this.state.token.address === '0x0') {
        let { amount, receiver, gas, gasPrice } = this.state
        if (amount && receiver) {
          this.props.validateEtherTx({ amount, receiver, gas, gasPrice })
        }
      } else {
        let { amount, receiver, gas, gasPrice, token } = this.state
        if (token && amount && receiver) {
          this.props.validateTransferTokensTx({ amount, receiver, gas, gasPrice, tokenAddress: token.address })
        }
      }
    })
  }

  handleSubmit = () => {
    if (this.state.token.address === '0x0') {
      let { amount, receiver, gas, gasPrice } = this.state
      let { requiredGas } = this.props.txStatus
      gas = gas || requiredGas
      this.props.sendEtherTx({ amount, receiver, gas, gasPrice })
    } else {
      let { amount, receiver, gas, gasPrice, token } = this.state
      let { requiredGas } = this.props.txStatus
      gas = gas || requiredGas
      this.props.sendTransferTokensTx({ amount, receiver, gas, gasPrice, tokenAddress: token.address })
    }
  }

  render () {
    const { token, amount, receiver, gas, gasPrice } = this.state
    const { loading, error, status, statusMessage, requiredGas, hash, receipt } = this.props.txStatus

    return (
      <div>
        <Label
            helperText='(in ether or in token decimals)'
            text='Amount to Send'
        >
        <ControlGroup fill={true} vertical={false}>
          <InputGroup
            icon='filter'
            placeholder='Ex: 1.0 for 1 ether'
            name='amount'
            value={amount}
            onChange={this.handleChange}
          />
          <TokenSelect
            token={token}
            tokens={tokens}
            onChange={this.handleTokenChange}
          />
        </ControlGroup>
        </Label>
        <br />
        <Label
            text='Receiver Address'
            helperText='(should start with 0x)'
        >
        <InputGroup
          placeholder='Receiver'
          name='receiver'
          value={receiver}
          onChange={this.handleChange}
        />
        </Label>
        <br />
        <GasSettings
          gas={gas}
          requiredGas={requiredGas}
          gasPrice={gasPrice}
          handleChange={this.handleChange}
        />
        <TxNotification
          loading={loading}
          error={error}
          hash={hash}
          receipt={receipt}
          status={status}
          requireGas={requiredGas}
          statusMessage={statusMessage}
        />
        <br/>
        <Button
          text='Send Transaction'
          intent='primary'
          large
          type='submit'
          fill
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

SendEtherForm.propTypes = {
  signEtherTx: PropTypes.func,
  validateEtherTx: PropTypes.func,
  sendEtherTx: PropTypes.func,
  signTransferTokensTx: PropTypes.func,
  validateTransferTokensTx: PropTypes.func,
  sendTransferTokensTx: PropTypes.func,
  txStatus: PropTypes.object
}

export default SendEtherForm
