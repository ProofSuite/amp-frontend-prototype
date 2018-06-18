import React from 'react'
import { Icon, Card, Intent, Elevation } from '@blueprintjs/core'

import styles from '../../WalletMenu.scss'

const Convert = () => {
  return (
    <div className={styles.card}>
      <Card
        elevation={Elevation.TWO}
        interactive={true}
      >
      <Icon
        icon='swap-vertical'
        iconSize={80}
        intent={Intent.PRIMARY}
      />
      <br/><br/>
      <h4>Convert</h4>
      </Card>
    </div>
  )
}

export default Convert
