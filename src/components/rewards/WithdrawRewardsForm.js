import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GasSettings from '../common/GasSettings/GasSettings'
import TxErrorNotification from '../common/TxNotification/TxErrorNotification'
import { Card, Button } from '@blueprintjs/core'

class WithdrawRewardsForm extends Component {
  state = { gas: '', gasPrice: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { gas, gasPrice } = this.state
    this.props.withdrawRewards({ gas, gasPrice })
  }

  render () {
    const { gas, gasPrice } = this.state
    const { error } = this.props

    return (
      <Card>
        <h3 as='h2'>Withdraw Rewards</h3>
          Withdraw your rewards by clicking the button below
          <GasSettings
            gas={gas}
            gasPrice={gasPrice}
            handleChange={this.handleChange}
          />
          { error && <TxErrorNotification error={error} /> }
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

WithdrawRewardsForm.propTypes = {
  withdrawRewards: PropTypes.func,
  error: PropTypes.string
}

export default WithdrawRewardsForm
