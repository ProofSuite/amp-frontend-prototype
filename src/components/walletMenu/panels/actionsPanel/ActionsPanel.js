import React, { Component } from 'react'

import SendEtherCard from './send/SendEtherCard'
import SendEtherModal from './send/SendEtherModal'
import ConvertEtherCard from './convert/ConvertEtherCard'
import ReceiveEtherCard from './receive/ReceiveEtherCard'

import styles from '../../WalletMenu.scss'

class ActionsPanel extends Component {

  state = {
    showSendModal: false
  }

  showSendModal = () => {
    this.setState({ showSendModal: true })
  }

  hideSendModal = () => {
    this.setState({ showSendModal: false })
  }

  render () {
    return (
      <div className={styles.actionsPanel}>
        <div className={styles.header}>
          <h2>What do you want to do ?</h2>
        </div>
        <div className={styles.cardGroup}>
          <ReceiveEtherCard />
          <SendEtherCard
            onClick={this.showSendModal}
            />
          <ConvertEtherCard />
          <SendEtherModal
            isOpen={this.state.showSendModal}
            onClose={this.hideSendModal}
          />
        </div>
      </div>
    )
  }
}

export default ActionsPanel
