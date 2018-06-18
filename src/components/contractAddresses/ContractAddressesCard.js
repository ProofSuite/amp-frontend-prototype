import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@blueprintjs/core'

const ContractAddressesCard = ({ contracts }) => {
  const contractList = Object.keys(contracts).map(name => (
      <tr key={name}>
        <td>{name}</td>
        <td>{contracts[name]}</td>
      </tr>
  ))

  return (
    <Card fluid>
      <h3>Contract Addresses</h3>
          <table className='pt-html-table pt-interactive pt-html-table-striped'>
            <tbody>
              {contractList}
            </tbody>
          </table>
    </Card>
  )
}

ContractAddressesCard.propTypes = {
  contracts: PropTypes.object
}

export default ContractAddressesCard
