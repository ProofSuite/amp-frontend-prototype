import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SendEtherForm from './SendEtherForm'

import {
  signEtherTx,
  validateEtherTx,
  sendEtherTx
} from '../../../../../actions/sendEtherTxActions'

import {
  signTransferTokensTx,
  validateTransferTokensTx,
  sendTransferTokensTx
} from '../../../../../actions/transferTokensTxActions'

import { getSendEtherTxData } from '../../../../../selectors'

class SendEtherTxFormContainer extends Component {
  render () {
    return (
      <SendEtherForm {...this.props} />
    )
  }
}

SendEtherTxFormContainer.propTypes = {
  signEtherTx: PropTypes.func,
  validateEtherTx: PropTypes.func,
  sendEtherTx: PropTypes.func,
  signTransferTokensTx: PropTypes.func,
  validateTransferTokensTx: PropTypes.func,
  sendTransferTokensTx: PropTypes.func,
  txStatus: PropTypes.object
}

const mapStateToProps = state => ({
  txStatus: getSendEtherTxData(state)
})

const mapDispatchToProps = {
  signEtherTx,
  validateEtherTx,
  sendEtherTx,
  signTransferTokensTx,
  validateTransferTokensTx,
  sendTransferTokensTx
}

export default connect(mapStateToProps, mapDispatchToProps)(SendEtherTxFormContainer)
