import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ImportWalletModal from './ImportWalletModal'

import { importWallet } from '../../../../../../actions/walletActions'

class ImportWalletContainer extends Component {

  state = { wallets: [], showModal: false }

  onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = () => {
      const serialized = reader.result
      const address = JSON.parse(serialized).address
      this.setState({ wallets: [...this.state.wallets, { serialized, address }] })
    }
    reader.readAsText(file)
  }

  onSubmit = () => {
    this.props.importWallet(this.state.wallets)
    this.setState({ wallets: [] })
  }

  render () {
    const walletList = this.state.wallets.map(f => <li key={f.address}>{f.address}</li>)
    const mergedProps = { ...this.props, walletList, onDrop: this.onDrop, onSubmit: this.onSubmit }
    return <ImportWalletModal {...mergedProps} />
  }
}

const mapDispatchToProps = {
  importWallet
}

ImportWalletContainer.propTypes = {
  importWallet: PropTypes.func
}

export default connect(null, mapDispatchToProps)(ImportWalletContainer)
