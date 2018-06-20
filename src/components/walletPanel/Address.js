import React from 'react'
import PropTypes from 'prop-types'

import styles from './WalletPanel.scss'

const Address = ({ address }) => {
  return (
    <div className={styles.address}>
      <h3>Address</h3>
      <p>{address}</p>
    </div>
  )
}

Address.propTypes = {
  address: PropTypes.string
}

export default Address
