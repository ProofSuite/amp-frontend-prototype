import React from 'react'
import { Icon, Card, Intent, Elevation } from '@blueprintjs/core'

import styles from '../../../WalletMenu.scss'

const Receive = () => {
  return (
    <div className={styles.card}>
      <Card
        elevation={Elevation.TWO}
        interactive={true}
      >
      <Icon
        icon='circle-arrow-down'
        iconSize={80}
        intent={Intent.PRIMARY}
      />
      <br/><br/>
      <h4>Receive</h4>
      </Card>
    </div>
  )
}

export default Receive
