import { connect } from 'react-redux'
import WalletManager from './WalletManager'
import React, { Component } from 'react'
import CreateWalletContainer from './modals/createWallet/CreateWalletContainer'
import ImportWalletContainer from './modals/importWallet/ImportWalletContainer'
import DeleteWalletContainer from './modals/deleteWallet/DeleteWalletContainer'
import styles from 'layouts/SettingsLayout.scss'

class WalletManagerContainer extends Component {

  state = {
    createModalVisible: false,
    importModalVisible: false,
    deleteModalVisible: false
  }

  showCreateModal = () => {
    this.setState({ createModalVisible: true })
  }

  hideCreateModal = () => {
    this.setState({ createModalVisible: false })
  }

  showImportModal = () => {
    this.setState({ importModalVisible: true })
  }

  hideImportModal = () => {
    this.setState({ importModalVisible: false })
  }

  showDeleteModal = () => {
    this.setState({ deleteModalVisible: true })
  }

  hideDeleteModal = () => {
    this.setState({ deleteModalVisible: false })
  }

  render () {
    const showModals = {
      showCreateModal: this.showCreateModal,
      showImportModal: this.showImportModal,
      showDeleteModal: this.showDeleteModal
    }

    return (
      <div className={styles.walletManager}>
        <WalletManager {...showModals} />
        <CreateWalletContainer
          visible = {this.state.createModalVisible}
          hideModal = {this.hideCreateModal}
          />
        <ImportWalletContainer
          visible = {this.state.importModalVisible}
          hideModal = {this.hideImportModal}
        />
        <DeleteWalletContainer
          visible = {this.state.deleteModalVisible}
          hideModal = {this.hideDeleteModal}
        />
      </div>
    )
  }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletManagerContainer)
