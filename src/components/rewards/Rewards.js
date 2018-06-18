import React, { Component } from 'react'
import RewardsContractState from './RewardsContractState'
import WithdrawRewardsTxForm from './WithdrawRewardsTxForm'
import PropTypes from 'prop-types'
import { Tab, Tabs } from '@blueprintjs/core'

class Rewards extends Component {

  state = {
    tab: '1'
  }

  componentDidMount () {
    this.props.queryRewardsContractState()
  }

  handleChange = (value) => {
    this.setState({ tab: value })
  }

  renderContractState = () => {
    return (
        <RewardsContractState
          {...this.props.contractState}
        />
    )
  }

  renderWithdrawRewardsTxForm = () => {
    return (
        <WithdrawRewardsTxForm />
    )
  }

  render () {
    return (
      <Tabs id='RewardsTabs' onChange={this.handleChange} selectedTabId={this.state.tab}>
        <Tab id='1' title='Contract State' panel={this.renderContractState()} />
        <Tab id='2' title='Rewards' panel={this.renderWithdrawRewardsTxForm()} />
        <Tabs.Expander />
      </Tabs>
    )
  }
}

Rewards.propTypes = {
  contractState: PropTypes.object,
  queryRewardsContractState: PropTypes.func
}

export default Rewards
