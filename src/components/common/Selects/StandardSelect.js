import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, MenuItem } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

class StandardSelect extends Component {

  renderItem (item, { handleClick, modifiers }) {
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={item.name}
        key={item.rank}
        onClick={handleClick}
        text={`${item.rank}. ${item.name}`}
      />
    )
  }

  render () {
    return (
      <Select
        items={this.props.items}
        filterable={false}
        itemRenderer={this.renderItem}
        noResults={<MenuItem disabled text='No results.' />}
        onItemSelect={this.props.handleChange}
        popoverProps={false}
      >
      <Button
        text={this.props.item ? `${this.props.item.name}` : '(No selection)' }
        rightIconName='double-caret-vertical'
      />
      </Select>
    )
  }
}

StandardSelect.propTypes = {
  item: PropTypes.object,
  items: PropTypes.object,
  onItemSelect: PropTypes.object,
  handleChange: PropTypes.func
}

export default StandardSelect
