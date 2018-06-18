import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { Table, Column, Cell, SelectionModes } from '@blueprintjs/table'

import styles from '../../layouts/SettingsLayout.scss'
import styled from 'styled-components'

class WalletTable extends Component {

  render () {
    const { selectedWallets, deleteWallet, onSelectWallet, onSelectDefaultWallet, walletList } = this.props
    const rowSelection = { selectedRowKeys: selectedWallets, onChange: onSelectWallet }

    const cellRenderer = (rowIndex) => <Cell>{walletList[rowIndex].wallet}</Cell>

    const columns = [
      {
        title: 'Wallet',
        dataIndex: 'wallet',
        key: 'wallet'
      }
    ]

    return (
      <div className={styles.walletList}>
        <WalletTableButtons>
          <Button.Group>
            <Button type='primary' onClick={deleteWallet}>
              Delete Selected Wallets
            </Button>
            <Button type='primary' onClick={onSelectDefaultWallet}>
              Select Default Wallet
            </Button>
          </Button.Group>
        </WalletTableButtons>

        <Table
          numRows={walletList.length}
          enableColumnReordering={true}
          enableColumnResizing={false}
          enableRowReordering={true}
          enableRowResizing={false}
          columnWidths={[500]}
          selectionModes={SelectionModes.ROWS_ONLY}
        >
          <Column key='1' name='Wallet' cellRenderer={cellRenderer} />
        </Table>
      </div>
    )
  }
}

const WalletTableButtons = styled.div`
  padding-bottom: 20px;
`

WalletTable.propTypes = {
  walletList: PropTypes.array,
  selectedWallets: PropTypes.array,
  deleteWallet: PropTypes.func,
  onSelectDefaultWallet: PropTypes.func,
  onSelectWallet: PropTypes.func
}

export default WalletTable
