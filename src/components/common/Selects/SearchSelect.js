import * as classNames from 'classnames'

import React, { Component } from 'react'
import { Button, Classes, MenuItem } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { Select } from '@blueprintjs/select'

class SearchSelect extends Component {
  filterItem (query, item, index) {
    return `${index + 1}. ${item.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
  }

  handleChange (value) {
    this.setState({ item: value })
  }

  renderItem ({ handleClick, isActive, item }) {
    const classes = classNames({
      [Classes.ACTIVE]: isActive,
      [Classes.INTENT_PRIMARY]: isActive
    })

    return (
      <MenuItem
        className={classes}
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
        itemPredicate={this.filterItem}
        itemRenderer={this.renderItem}
        noResults={<MenuItem disabled text='No results.' />}
        onItemSelect={this.props.handleChange}
        popoverProps={false}
        initialContent
      >
        <Button
          text={
            this.props.item
              ? `${this.props.item.name})`
              : '(No selection)'
          }
          rightIconName='double-caret-vertical'
        />
      </Select>
    )
  }
}

SearchSelect.propTypes = {
  item: PropTypes.object,
  items: PropTypes.object,
  onItemSelect: PropTypes.object,
  handleChange: PropTypes.func
}

export default SearchSelect
