import React from 'react'
import { Button } from '@blueprintjs/core'

import styles from './WalletPanel.scss'

const PrivateKey = () => {
  return (
    <div className={styles.privateKey} >
      <h3>Private Key</h3>
      <p>****************************************************</p>

      <Button key='Display Private Key' text='Display Private Key' />
    </div>
  )
}

export default PrivateKey
