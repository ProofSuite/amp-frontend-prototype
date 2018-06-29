import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Radio, RadioGroup, Button, InputGroup, Label } from '@blueprintjs/core'
import NetworkSelect from './NetworkSelect'

import styled from 'styled-components'
import styles from '../../layouts/SettingsLayout.scss'

class ProviderSettings extends Component {

  renderCustomProviderForm () {
    const { handleChange, handleSelectChange, form } = this.props
    const { type, network, url } = form

    return (
      <div>
        <hr/>
        <RadioGroup label='Provider Type' name='type' onChange={handleChange} selectedValue={type}>
          <Radio label='Metamask' value='metamask' />
          <Radio label='Local' value='local' />
          <Radio label='Remote' value='remote' />
          <Radio label='Infura' value='infura' />
        </RadioGroup>

        <InputWrapper>
          <Label text='Network ID'>
            <NetworkSelect handleChange={handleSelectChange} network={network} />
          </Label>
        </InputWrapper>

        <Label text='Provider URL'>
          <InputGroup
            placeholder='Ex: 127.0.0.1:8545'
            value={url}
            onChange={handleChange}
            name='url'
          />
        </Label>
      </div>
    )
  }

  render () {
    const { handleChange, handleSubmit, form, loading } = this.props
    const { provider } = form

    return (
      <div className={styles.providerSettings}>
        <Card interactive={true}>
        <form>
          <RadioGroup name='provider' onChange={handleChange} selectedValue={provider} label='Choose a provider' >
            <Radio label='Default Metamask Provider' value='metamask' />
            <Radio label='Default Local Node Provider' value='local' />
            <Radio label='Default Infura Provider' value='infura' />
            <Radio label='Default Infura Provider (Rinkeby)' value='infura (rinkeby)' />
            <Radio label='Custom Provider' value='custom' />
          </RadioGroup>
        </form>
        {provider === 'custom' && this.renderCustomProviderForm()}
        <ButtonWrapper>
          <Button
            intent='primary'
            loading={loading}
            onClick={handleSubmit}
            text='Change Provider'
          />
        </ButtonWrapper>
        </Card>
      </div>
    )
  }
}

const InputWrapper = styled.div`
  padding-bottom: 15px;
  padding-top: 15px;
`

const ButtonWrapper = styled.div`
  padding-top: 20px;
`

ProviderSettings.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  form: PropTypes.object
}

export default ProviderSettings
