import React, { Component } from 'react'
import { Icon, Intent } from '@blueprintjs/core'

import styled from 'styled-components'

export default class DownloadWalletStep extends Component {
  render () {
    return (
      <DownloadWalletContainer>
        <Icon icon='tick' iconSize={100} intent={Intent.SUCCESS} />
        <p style={{ fontSize: 26 }}>Wallet successfully created!</p>
        <a href=''>Download wallet</a>
      </DownloadWalletContainer>
    )
  }
}

const DownloadWalletContainer = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
