import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StandardSelect from '../common/Selects/StandardSelect'

const networks = [
  { name: '1 (Mainnet)' },
  { name: '2 (Ropsten)' },
  { name: '3 (Rinkeby)' },
  { name: '4 (?)' },
  { name: '1000 (Local Default TestRPC)' }
].map((m, index) => ({ ...m, rank: index + 1 }))

class NetworkSelect extends Component {
  state = {
    network: networks[0]
  }

  handleChange = e => {
    this.setState({ network: e.target.value })
  }

  render () {
    return (
      <StandardSelect
        items={networks}
        item={this.props.network || networks[0]}
        handleChange={this.props.handleChange}
      />
    )
  }
}

NetworkSelect.propTypes = {
  handleChange: PropTypes.func,
  network: PropTypes.object
}

export default NetworkSelect
