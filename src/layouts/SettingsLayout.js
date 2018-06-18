import React, { Component } from 'react'
import ProviderSettingsContainer from '../components/providerSettings/ProviderSettingsContainer'

import styles from './SettingsLayout.scss'

class SettingsLayout extends Component {

  render () {
    return (
      <div className={styles.content}>
        <ProviderSettingsContainer />
      </div>
    )
  }
}

export default SettingsLayout
