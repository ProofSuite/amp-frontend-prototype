const BigNumber = require('bignumber.js')

export const removeHex = (address) => {
  return address.replace('0x', '').toLowerCase()
}

export const addHex = (value) => {
  return ('0x' + (new BigNumber(value).toString(16)))
}
