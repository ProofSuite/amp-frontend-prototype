import React from 'react'
import { Button, Intent } from '@blueprintjs/core'

import styled from 'styled-components'

export const buttonRenderer = () => {
  return (
    <Cell>
      <Button intent={Intent.PRIMARY} text='Deposit' />
      <Button type='primary' text='Withdraw' />
    </Cell>
  )
}

export const withdrawButtonRenderer = () => {
  return (
    <Cell>
      <Button type='primary' text='Withdraw' />
    </Cell>
  )
}

export const depositButtonRenderer = () => {
  return (
    <Cell>
      <Button type='primary' text='Deposit' />
    </Cell>
  )
}

export const tokenNameRenderer = (props) => {
  return (
    props.value
  )
}

export const balanceRenderer = (props) => {
  return (
    props.value
  )
}

export const allowanceRenderer = (props) => {
  return (
    props.value
  )
}

const Cell = styled.div`
  display: flex;
  justify-content: left;
  padding: 5px;
`
