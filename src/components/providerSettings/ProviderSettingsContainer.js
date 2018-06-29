import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProviderSettings from './ProviderSettings'
import { setProvider, setCustomProvider } from '../../actions/providerActions'

const mapDispatchToProps = {
  setCustomProvider,
  setProvider
}

class ProviderSettingsContainer extends Component {
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
    this.props.setCustomProvider(this.state.form)
  }

  handleChange = e => {
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

  render () {
    return (
      <ProviderSettings
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleSelectChange={this.handleSelectChange}
        disableButton={this.disableButton}
      />
    )
  }
}

ProviderSettingsContainer.propTypes = {
  setProvider: PropTypes.func,
  setCustomProvider: PropTypes.func
}

export default connect(null, mapDispatchToProps)(ProviderSettingsContainer)
