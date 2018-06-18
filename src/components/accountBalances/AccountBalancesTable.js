import React from 'react'
import BalanceRow from './BalanceRow'
import { Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const AccountBalancesTable = (props) => {
  const balances = props.balances
  const balancesList = balances.map((balance, index) => (
    <BalanceRow key={index} {...balance} />
  ))

  return (
    <table className='pt-html-table pt-interactive' >
      <thead>
        <tr active>
          <th>Address</th>
          <th>Ethereum Balance</th>
          <th>Cryptodollar Balance</th>
          <th>Reserved Ether Balance</th>
        </tr>
      </thead>
      <tbody>
      { balances ? balancesList : <Loader>Loading</Loader>}
      </tbody>
    </table>
  )
}

AccountBalancesTable.propTypes = {
  balances: PropTypes.array
}

export default AccountBalancesTable
