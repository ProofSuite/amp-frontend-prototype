import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAndEncryptWallet } from 'helpers/wallets'
import { createWallet } from 'actions/walletActions'
import CreateWalletModal from './CreateWalletModal'
import PropTypes from 'prop-types'

class CreateWalletContainer extends Component {
  state = {
    currentStep: 0,
    password: '',
    showEncryptionProgress: false,
    encryptionPercentage: 0,
    address: '',
    serialized: ''
  }

  cancel = () => {
    this.props.hideModal()
    setTimeout(() => {
      this.setState({
        currentStep: 0,
        password: '',
        encryptionPercentage: 0,
        address: '',
        serialized: '',
        showEncryptionProgress: false
      })
    }, 500)
  }

  updateProgressBar = percent => {
    if (percent === 1) {
      this.setState({ encryptionPercentage: 1 })
      setTimeout(() => {
        this.setState({ currentStep: 1 })
      }, 1500)
    } else if (percent > 0.75) {
      this.setState({ encryptionPercentage: 0.75 })
    } else if (percent > 0.50) {
      this.setState({ encryptionPercentage: 0.50 })
    } else if (percent > 0.25) {
      this.setState({ encryptionPercentage: 0.25 })
    }
  }

  goToDownloadWallet = async () => {
    this.setState({ showEncryptionProgress: true })
    let { serialized, address } = await createAndEncryptWallet(this.state.password, percent =>
      this.updateProgressBar(percent)
    )
    this.setState({ address, serialized })
  }

  goBackToCreateWallet = () => {
    this.setState({ currentStep: 0 })
  }

  goBackToDownloadWallet = () => {
    this.setState({ currentStep: 1 })
  }

  goToComplete = () => {
    this.setState({ currentStep: 2 })
  }

  complete = () => {
    this.props.createWallet(this.state.address, this.state.serialized)
    this.props.hideModal()
  }

  updatePassword = e => {
    this.setState({ password: e.target.value })
  }

  render () {
    const mergedProps = {
      ...this.props,
      ...this.state,
      goToDownloadWallet: this.goToDownloadWallet,
      goBackToCreateWallet: this.goBackToCreateWallet,
      goToComplete: this.goToComplete,
      goBackToDownloadWallet: this.goBackToDownloadWallet,
      updatePassword: this.updatePassword,
      complete: this.complete,
      cancel: this.cancel
    }
    return <CreateWalletModal {...mergedProps} />
  }
}

const mapDispatchToProps = {
  createWallet
}

CreateWalletContainer.propTypes = {
  hideModal: PropTypes.func,
  createWallet: PropTypes.func
}

export default connect(null, mapDispatchToProps)(CreateWalletContainer)
