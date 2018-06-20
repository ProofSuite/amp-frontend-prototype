import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Intent, Button } from '@blueprintjs/core'
import WalletPasswordStep from './WalletPasswordStep'
import DownloadWalletStep from './DownloadWalletStep'
import WalletInformationStep from './WalletInformationStep'
import Steps from 'rc-steps'

class CreateWalletModal extends Component {

  renderWalletPasswordStep () {
    const { password, updatePassword, showEncryptionProgress, encryptionPercentage } = this.props
    return (
      <WalletPasswordStep
        password={password}
        updatePassword={updatePassword}
        showEncryptionProgress={showEncryptionProgress}
        encryptionPercentage={encryptionPercentage}
       />
    )
  }

  renderWalletDownloadStep () {
    return (
      <DownloadWalletStep />
    )
  }

  renderWalletInformationStep () {
    return (
      <WalletInformationStep />
    )
  }

  render () {
    const currentStep = this.props.currentStep

    const buttons = [
      {
        'ok': 'Create Wallet',
        'cancel': 'Cancel',
        'onOkClick': this.props.goToDownloadWallet,
        'onCancelClick': this.props.cancel
      },
      {
        'ok': 'I have downloaded my wallet',
        'cancel': 'Go back',
        'onOkClick': this.props.goToComplete,
        'onCancelClick': this.props.goBackToCreateWallet
      },
      {
        'ok': 'Complete',
        'cancel': 'Go back',
        'onOkClick': this.props.complete,
        'onCancelClick': this.props.goBackToDownloadWallet
      }
    ]
    return (
      <Dialog
        title='Create Wallet Modal'
        icon='inbox'
        isOpen={this.props.visible}
        onClose={this.props.hideModal}
        width = {800}
        style={{ width: '600px' }}
      >
      <div className='pt-dialog-body'>
        <Steps current={this.props.currentStep}>
          <Steps.Step title='Choose password' />
          <Steps.Step title='Download Wallet' />
          <Steps.Step title='Wallet Information' />
        </Steps>
        { this.props.currentStep === 0 && this.renderWalletPasswordStep()}
        { this.props.currentStep === 1 && this.renderWalletDownloadStep()}
        { this.props.currentStep === 2 && this.renderWalletInformationStep()}
      </div>
      <div className='pt-dialog-footer'>
        <div className='pt-dialog-footer-actions'>
          <Button
            key='Previous'
            text={buttons[currentStep].cancel}
            onClick={buttons[currentStep].onCancelClick} />
          <Button
            key='Next'
            text={buttons[currentStep].ok}
            intent={Intent.PRIMARY}
            onClick={buttons[currentStep].onOkClick} />
        </div>
      </div>
      </Dialog>
    )
  }
}

CreateWalletModal.propTypes = {
  visible: PropTypes.bool,
  hideModal: PropTypes.func,
  currentStep: PropTypes.number,
  goToDownloadWallet: PropTypes.func,
  goBackToCreateWallet: PropTypes.func,
  goToComplete: PropTypes.func,
  goBackToDownloadWallet: PropTypes.func,
  complete: PropTypes.func,
  cancel: PropTypes.func,
  password: PropTypes.func,
  updatePassword: PropTypes.func,
  encryptionPercentage: PropTypes.number,
  showEncryptionProgress: PropTypes.bool
}

export default CreateWalletModal
