import React, { Component } from 'react'
import DEXLayout from '../layouts/DEXLayout'
import CryptoFiatLayout from '../layouts/CryptoFiatLayout'
import SettingsLayout from '../layouts/SettingsLayout'
import TestLayout from '../layouts/TestLayout'
import WalletLayout from '../layouts/WalletLayout'
import TableLayout from '../layouts/TableLayout'
import PropTypes from 'prop-types'

import { hot } from 'react-hot-loader'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import '../styles/global.scss?global'
import '../styles/styles.scss?global'
import '@blueprintjs/core/lib/css/blueprint.css?global'
import '@blueprintjs/table/lib/css/table.css?global'

// Global imports for the stepper component (until we find a better method)
import 'rc-steps/assets/index.css?global'
import 'rc-steps/assets/iconfont.css?global'

import NavBar from '../components/common/NavBar'

class App extends Component {

  componentDidMount () {
    this.props.queryAccounts()
  }

  render () {
    return (
      <BrowserRouter>
      <div>
        <div className='pt-dark'>
          <NavBar />
          <div style={{ 'marginTop': '45px' }} >
          <Switch>
            <Route exact path='/' component={WalletLayout}/>
            <Route path='/cryptofiat' component={CryptoFiatLayout}/>
            <Route path='/dex' component={DEXLayout}/>
            <Route path='/settings' component={SettingsLayout}/>
            <Route path='/test' component={TestLayout} />
            <Route path='/table' component={TableLayout} />
          </Switch>
          </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  queryAccounts: PropTypes.func
}

export default hot(module)(App)

