import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'

class StandardTable extends Component {
  constructor (props) {
    super(props)

    this.state = {
      columnDefs: [
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Price', field: 'price' }
      ],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 720000 }
      ]
    }
  }

  handleRowClicked () {
    console.log('Row has been clicked')
  }

  handleCellClicked () {
    console.log('Cell has been clicked')
  }

  render () {
    return (
      <div
      className='ag-theme-dark'
      style={{ height: '500px', width: '600px' }}
      >
      <AgGridReact
        rowSelection='multiple'
        enableColResize={true}
        columnDefs={this.state.columnDefs}
        rowData={this.state.rowData}
        onRowClicked={this.handleRowClicked}
        onCellClicked={this.handleCellClicked}
      >
      </AgGridReact>
      </div>
    )
  }
}

export default StandardTable
