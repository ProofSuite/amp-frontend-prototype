/*

  MIT License

  Copyright (c) 2016 MyEtherWallet

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

import ethereumUtil from 'ethereumjs-util'

export const isValidPrivateKey = (privateKey) => {
  if (typeof privateKey === 'string') {
    return privateKey.length === 64
  } else if (privateKey instanceof Buffer) {
    return privateKey.length === 32
  } else {
    return false
  }
}

export const isValidETHAddress = (address) => {
  if (!address) return false
  return ethereumUtil.isValidAddress(address)
}

export const isValidHex = (str) => {
  if (typeof str !== 'string') return false
  if (str === '') return true
  str = str.substring(0, 2) === '0x'
        ? str.substring(2).toUpperCase()
        : str.toUpperCase()
  const re = /^[0-9A-F]+$/g
  return re.test(str)
}

