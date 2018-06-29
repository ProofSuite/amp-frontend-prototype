import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { Dialog, Icon, Intent } from '@blueprintjs/core'

import styled from 'styled-components'

class ImportWalletCard extends Component {

  render () {
    return (
      <Dialog
        title='Import Wallet Modal'
        isOpen = {this.props.visible}
        onClose = {this.props.hideModal}
        className='pt-dark'
      >
        <DropzoneContainer>
          <Dropzone onDrop={this.props.onDrop.bind(this)}>
            <DropzoneMessageContainer>
              <Icon icon='inbox' iconSize={120} intent={Intent.PRIMARY} />
            </DropzoneMessageContainer>
          </Dropzone>
            <ul>{this.props.walletList}</ul>
            <p>Click or Drag files to upload your wallets</p>
        </DropzoneContainer>
      </Dialog>
    )
  }
}

const DropzoneContainer = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`

const DropzoneMessageContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 40px;
`

ImportWalletCard.propTypes = {
  visible: PropTypes.bool,
  hideModal: PropTypes.func,
  walletList: PropTypes.array,
  onDrop: PropTypes.func,
  onSubmit: PropTypes.func
}

export default ImportWalletCard
