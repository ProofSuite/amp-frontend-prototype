import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@blueprintjs/core'
import SendEtherTxFormContainer from './SendEtherTxFormContainer'

class SendEtherModal extends Component {
  render () {
    return (
      <Dialog
        title='Send Ether or Tokens'
        icon='inbox'
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        style={{ width: '800px' }}
        className='pt-dark'
        canOutsideClickClose={false}
      >
      <div className='pt-dialog-body'>
        <SendEtherTxFormContainer />
      </div>
      </Dialog>
    )
  }
}

SendEtherModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default SendEtherModal
