import React from 'react'

const BalanceRow = (props) => {
  const cells = Object.keys(props).map((variable) => <td key={variable}>{props[variable]}</td>)
  return (
    <tr>
      {cells}
    </tr>
  )
}

export default BalanceRow
