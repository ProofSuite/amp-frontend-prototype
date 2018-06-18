import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card } from '@blueprintjs/core'

class CryptoDollarContractState extends PureComponent {
  renderContractState (data) {
    const dataList = Object.keys(data).map((variable) => (
      <tr key={variable}>
        <td>{variable}</td>
        <td>{data[variable]}</td>
      </tr>
    ))

    return (
      <Card>
        <h3>CryptoDollar Contract State</h3>
        <table>
          <tbody>{dataList}</tbody>
        </table>
      </Card>
    )
  }

  renderLoader () {
    return <div>Loading</div>
  }

  render () {
    const { data, loading } = this.props
    if (loading || !data) return this.renderLoader()

    return this.renderContractState(data)
  }
}

CryptoDollarContractState.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool
}

export default CryptoDollarContractState
