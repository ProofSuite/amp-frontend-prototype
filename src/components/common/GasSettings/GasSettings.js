import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Collapse, InputGroup, Button } from '@blueprintjs/core'

import styles from './GasSettings.scss'

class GasSettings extends PureComponent {
  state = { visible: false }

  toggleGasSettings = e => {
    this.setState({ visible: !this.state.visible })
  }

  render () {
    const { visible } = this.state
    const { gas, gasPrice, requiredGas, handleChange } = this.props

    return (
      <div className={styles.gasSettings}>
      <Button minimal={true} text='Show Gas Settings' onClick={this.toggleGasSettings}/>
      <Collapse isOpen={visible}>
        <InputGroup
          placeholder={requiredGas || 'Gas'}
          value={gas}
          onChange={handleChange}
          className={styles.input}
        />
        <InputGroup
          placeholder='Gas Price'
          value={gasPrice}
          onChange={handleChange}
          className={styles.input}
        />
      </Collapse>
      </div>
    )
  }
}

GasSettings.propTypes = {
  gas: PropTypes.string,
  requiredGas: PropTypes.number,
  gasPrice: PropTypes.string,
  handleChange: PropTypes.func
}

export default GasSettings
