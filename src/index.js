import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './app/AppContainer'
import store from './redux-store'

render((
  <Provider store={store}>
    <AppContainer />
  </Provider>
), document.getElementById('root'))
