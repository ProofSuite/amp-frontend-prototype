import React, { Component } from 'react'
import ProviderSettingsForm from './ProviderSettingsForm'
import { Card } from '@blueprintjs/core'

import styles from '../../layouts/SettingsLayout.scss'

class ProviderSettings extends Component {

  render () {
    return (
        <div className={styles.providerSettings}>
            <Card interactive={true} >
              <ProviderSettingsForm {...this.props} />
            </Card>
        </div>
    )
  }
}

export default ProviderSettings
