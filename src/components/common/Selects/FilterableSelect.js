import React, { Component } from 'react'
import { Button, MenuItem } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { Select } from '@blueprintjs/select'

class FilterableSelect extends Component {

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
        filterable={true}
        itemRenderer={this.renderItem}
        noResults={<MenuItem disabled text='No results.' />}
        onItemSelect={this.props.onChange}
        popoverProps={false}
      >
      <Button
        text={this.props.item ? `${this.props.item.name}` : '(No selection)' }
        rightIconName='double-caret-vertical'
        fill={true}
        intent='primary'
      />
      </Select>
    )
  }
}

FilterableSelect.propTypes = {
  item: PropTypes.object,
  items: PropTypes.array,
  onItemSelect: PropTypes.object,
  onChange: PropTypes.func
}

export default FilterableSelect
