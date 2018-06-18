import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilterableSelect from './FilterableSelect'

class TokenSelect extends Component {
  render () {
    return (
      <FilterableSelect
        items={this.props.tokens}
        item={this.props.token}
        onChange={this.props.onChange}
      />
    )
  }
}

TokenSelect.propTypes = {
  onChange: PropTypes.func,
  tokens: PropTypes.object,
  token: PropTypes.object
}

export default TokenSelect
