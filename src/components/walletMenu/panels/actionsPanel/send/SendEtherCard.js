import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Card, Intent, Elevation } from '@blueprintjs/core'

import styles from '../../../WalletMenu.scss'

class SendEtherCard extends Component {

  render () {
    return (
      <div className={styles.card}>
      <Card
        interactive={true}
        onClick={this.props.onClick}
      >
      <Icon
        icon='circle-arrow-up'
        iconSize={80}
        intent={Intent.PRIMARY}
       />
       <br/><br/>
       <h4>Send</h4>
      </Card>
    </div>
    )
  }
}

SendEtherCard.propTypes = {
  onClick: PropTypes.func
}

export default SendEtherCard
