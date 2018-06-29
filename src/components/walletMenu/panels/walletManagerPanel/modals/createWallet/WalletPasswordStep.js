import React, { Component } from 'react'
import { ControlGroup, InputGroup, Label, ProgressBar, Intent } from '@blueprintjs/core'
import PropTypes from 'prop-types'

import styled from 'styled-components'

class WalletPasswordStep extends Component {

  render () {
    const { password, updatePassword, showEncryptionProgress, encryptionPercentage } = this.props

    return (
      <div>
      <PasswordInputContainer>
        <Label helperText='Input a secure password that will be used to encrypt your wallet'>
        <ControlGroup fill={true} vertical={false}>
          <InputGroup
            icon='password'
            placeholder='Input a secure password'
            type='password'
            name='password'
            value={password}
            onChange={updatePassword}
          >
          </InputGroup>
        </ControlGroup>
        </Label>
        <br/>
        <a href=''>Learn how to secure your wallet</a>
      </PasswordInputContainer>
      <br/>
      {showEncryptionProgress && <ProgressBar animate intent={Intent.PRIMARY} value={encryptionPercentage} stripes />}
      </div>
    )
  }
}

const PasswordInputContainer = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  width: 500px;
  margin: auto;
`

WalletPasswordStep.propTypes = {
  password: PropTypes.func,
  updatePassword: PropTypes.func,
  showEncryptionProgress: PropTypes.bool,
  encryptionPercentage: PropTypes.number
}

export default WalletPasswordStep
