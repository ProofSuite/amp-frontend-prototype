import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@blueprintjs/core'

const RewardsContractState = ({ data }) => {
  const dataList = Object.keys(data).map(variable => (
      (
        <tr key={variable}>
          <td>{variable}</td>
          <td>{data[variable]}</td>
        </tr>
      )
  ))

  return (
    <Card>
      <h3>Rewards Contract State</h3>
      <table className='pt-html-table pt-interactive'>
        <tbody>
          {dataList}
        </tbody>
      </table>
    </Card>
  )
}

RewardsContractState.propTypes = {
  data: PropTypes.object
}

export default RewardsContractState
