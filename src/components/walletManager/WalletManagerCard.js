import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from '@blueprintjs/core'

import styles from '../../layouts/WalletLayout.scss'
import styled from 'styled-components'

class WalletManagerCard extends Component {

  render () {
    return (
      <div className={styles.walletManager}>
        <Card className={styles.walletManagerCard}>
          <h3><a href='#'>Wallet Manager</a></h3>
          <BlockButtonContainer>
            <BlockButton onClick={this.props.showCreateModal}>CREATE</BlockButton>
            <BlockButton onClick={this.props.showImportModal}>IMPORT</BlockButton>
          </BlockButtonContainer>
        </Card>
      </div>
    )
  }

}

const BlockButton = styled.button`
  display: inline-block;
  border-radius: 4px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  height: 11rem;
  font-size: 20px;
  background: transparent;
  color: #1890ff;
  border: 2px solid #1890ff;
  &:hover {
    background: #1890ff;
    color: white;
  }
`

const BlockButtonContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
`

WalletManagerCard.propTypes = {
  showCreateModal: PropTypes.func,
  showImportModal: PropTypes.func,
  showDeleteModal: PropTypes.func
}

export default WalletManagerCard
