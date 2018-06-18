import React, { Component } from 'react'
import { AgGridReact as Grid, AgGridColumn as GridColumn } from 'ag-grid-react'
import { buttonRenderer } from './renderers'
import classNames from 'classnames'

const data = [
  { tokenName: 'EOS', balance: '10.0000', allowance: '5.000000' },
  { tokenName: 'ZRX', balance: '1.00000', allowance: '0.000000' },
  { tokenName: 'EOS', balance: '5.00000', allowance: '2.000000' },
  { tokenName: 'EOS', balance: '8.00000', allowance: '5.000000' }
]

import styles from '../../WalletMenu.scss'

class DepositTable extends Component {

  handleRowClicked () {
    console.log('Row has been clicked')
  }

  handleCellClicked () {
    console.log('Cell has been clicked')
  }

  onGridReady (params) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    this.gridApi.sizeColumnsToFit()
  }

  autoSizeAll () {
    var allColumnIds = []
    this.gridColumnApi.getAllColumns().forEach((column) => {
      allColumnIds.push(column.colId)
    })

    this.gridColumnApi.autoSizeColumns(allColumnIds)
  }

  render () {
    const style = classNames({
      'ag-theme-dark': true,
      [ styles.depositsTable ]: true
    })

    return (
      <div className={style} >
      <Grid
        rowSelection='multiple'
        enableColResize={true}
        rowData={data}
        onRowClicked={this.handleRowClicked}
        onCellClicked={this.handleCellClicked}
        onGridReady={this.onGridReady.bind(this)}
        rowHeight='45'
        headerHeight='45'
      >
        <GridColumn headerName='Token Name' field='tokenName'></GridColumn>
        <GridColumn headerName='Balances' field='balance'></GridColumn>
        <GridColumn headerName='Allowances' field='allowance'></GridColumn>
        <GridColumn headerName='' field='buttons' cellRendererFramework={buttonRenderer}></GridColumn>
      </Grid>
      </div>
    )
  }
}

export default DepositTable
