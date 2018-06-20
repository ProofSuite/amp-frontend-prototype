import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Intent } from '@blueprintjs/core'

import styles from '../../WalletMenu.scss'

class WalletManager extends Component {
  render () {
    return (
      <div>
        <div>
          <div className={styles.card}>
            <Card onClick={this.props.showCreateModal} interactive>
              <Icon icon='circle-arrow-up' iconSize={60} intent={Intent.PRIMARY} />
              CREATE
            </Card>
          </div>
          <div className={styles.card}>
            <Card onClick={this.props.showImportModal} interactive>
              <Icon icon='circle-arrow-down' iconSize={60} intent={Intent.PRIMARY} />
              IMPORT
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

WalletManager.propTypes = {
  showCreateModal: PropTypes.func,
  showImportModal: PropTypes.func,
  showDeleteModal: PropTypes.func
}

export default WalletManager
