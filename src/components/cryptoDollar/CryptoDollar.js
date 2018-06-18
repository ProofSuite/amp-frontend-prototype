import React, { Component } from 'react'
import BuyCryptoDollarTxForm from './txForms/BuyCryptoDollarTxForm'
import SellCryptoDollarTxForm from './txForms/SellCryptoDollarTxForm'
import SellUnpeggedCryptoDollarTxForm from './txForms/SellUnpeggedCryptoDollarTxForm'
import TransferCryptoDollarTxForm from './txForms/TransferCryptoDollarTxForm'
import CryptoDollarContractState from './CryptoDollarContractState'
import { Tabs, Tab } from '@blueprintjs/core'
import PropTypes from 'prop-types'

class CryptoDollar extends Component {

  state = {
    tab: '1'
  }

  componentDidMount () {
    this.props.queryCryptoDollarContractState()
  }

  handleChange = (value) => {
    this.setState({ tab: value })
  }

  renderContractState = () => {
    const { error, data } = this.props.contractState
    return (
        <CryptoDollarContractState error={error} data={data} />
    )
  }

  renderBuyCryptoDollarTxForm = () => (
        <BuyCryptoDollarTxForm/>
  )

  renderSellCryptoDollarTxForm = () => (
      <SellCryptoDollarTxForm/>
  )

  renderSellUnpeggedCryptoDollarTxForm = () => (
      <SellUnpeggedCryptoDollarTxForm/>
  )

  renderTransferCryptoDollarTxForm = () => (
      <TransferCryptoDollarTxForm/>
  )

  render () {
    return (
      <Tabs id='CryptoDollarTab' onChange={this.handleChange} selectedTabId={this.state.tab}>
        <Tab id='1' title='Contract State' panel={this.renderContractState()} />
        <Tab id='2' title='Buy' panel={this.renderBuyCryptoDollarTxForm()} />
        <Tab id='3' title='Sell' panel={this.renderSellCryptoDollarTxForm()} />
        <Tab id='4' title='Sell (Unpegged)' panel={this.renderSellUnpeggedCryptoDollarTxForm()} />
        <Tab id='5' title='Transfer' panel={this.renderTransferCryptoDollarTxForm()} />
        <Tabs.Expander />
      </Tabs>
    )
  }
}

CryptoDollar.propTypes = {
  contractState: PropTypes.object,
  queryCryptoDollarContractState: PropTypes.func
}

export default CryptoDollar
