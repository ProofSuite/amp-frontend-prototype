import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio, RadioGroup, Switch, Button, InputGroup } from '@blueprintjs/core'
import NetworkSelect from './NetworkSelect'

class ProviderSettingsForm extends Component {
  state = {
    loading: false,
    expand: false,
    form: {
      provider: '',
      type: '',
      websockets: false,
      network: null,
      url: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.disableButton()
    console.log(e)
    this.props.setCustomProvider(this.state.form)
  }

  handleChange = e => {
    console.log(e)
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({ ...this.state, form: { ...this.state.form, [name]: value } })
  }

  handleSelectChange = e => {
    this.setState({ ...this.state, form: { ...this.state.form, network: e } })
  }

  disableButton = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 3000)
  }

  renderCustomProviderForm () {
    return (
      <div>
        <br/>
        <h5>Provider Type</h5>
        <RadioGroup
          name='type'
          onChange={this.handleChange}
          selectedValue={this.state.form.type}
        >
        <Radio label='Metamask' value='metamask' />
        <Radio label='Local' value='local' />
        <Radio label='Remote' value='remote' />
        <Radio label='Infura' value='infura' />
        </RadioGroup>

        <br/>
        <h5>Websockets</h5>
        <Switch
          name='websockets'
          checked={this.state.form.websockets}
          onChange={this.handleChange}
          disabled
        />

        <br/>
        <h5>Network ID</h5>
        <NetworkSelect
          handleChange={this.handleSelectChange}
          network={this.state.form.network}
        />

        <br/><br/>
        <h5>Provider URL</h5>
        <InputGroup
          placeholder='Ex: 127.0.0.1:8545'
          value={this.state.form.url}
          onChange={this.handleChange}
          name='url'
        />
      </div>
    )
  }

  render () {
    return (
      <div>
        <form>
          <RadioGroup
            name='provider'
            onChange={this.handleChange}
            selectedValue={this.state.form.provider}
          >
            <Radio label='Default Metamask Provider' value='metamask' />
            <Radio label='Default Local Node Provider' value='local' />
            <Radio label='Default Infura Provider' value='infura' />
            <Radio label='Default Infura Provider (Rinkeby)' value='infura (rinkeby)' />
            <Radio label='Custom Provider' value='custom' />
          </RadioGroup>
        </form>
        {this.state.form.provider === 'custom' ? this.renderCustomProviderForm() : null}
        <br/><br/>
        <Button
          intent='primary'
          loading={this.state.loading}
          onClick={this.handleSubmit}
        >
          Change Provider
        </Button>
      </div>
    )
  }
}

ProviderSettingsForm.propTypes = {
  form: PropTypes.object,
  setCustomProvider: PropTypes.func
}

export default ProviderSettingsForm
