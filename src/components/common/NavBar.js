import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Alignment,
  Button,
  InputGroup
} from '@blueprintjs/core'

class NavBar extends Component {
  state = { active: 'wallet' }

  handleClick = e => {
    console.log('clicked', e.target)
  }

  render () {
    return (
      <Navbar fixedToTop>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>AMP</NavbarHeading>
          <NavbarDivider />
          <Link to='/' className='pt-no-style'>
            <Button
              minimal
              name='wallet'
              icon='shield'
              text='Wallet'
              active={this.state.active === 'wallet'}
              onClick={this.handleClick}
            />
          </Link>
          <Link to='/dex' className='pt-no-style'>
            <Button
              minimal
              icon='dollar'
              text='DEX'
              active={this.state.active === 'dex'}
              onClick={this.handleClick}
            />
          </Link>
          <Link to='/settings' className='pt-no-style'>
            <Button
              minimal
              icon='settings'
              text='Settings'
              active={this.state.active === 'settings'}
              onClick={this.handleClick}
            />
          </Link>
          <Link to='/test' className='pt-no-style'>
            <Button
              minimal
              icon='wrench'
              text='Test'
              active={this.state.active === 'test'}
              onClick={this.handleClick}
            />
          </Link>
          <Link to='/table' className='pt-no-style'>
            <Button
              minimal
              icon='wrench'
              text='Table'
              active={this.state.table === 'table'}
              onClick={this.handleClick}
            />
          </Link>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <InputGroup placeholder='Search...' type='search' />
        </NavbarGroup>
      </Navbar>
    )
  }
}

export default NavBar
