import { abi } from 'ethereumjs-abi'
import { _ } from 'lodash'
import { Ajv } from 'ajv'
import { Transaction } from 'ethereumjs-tx'
import { ethUtil } from 'ethereumjs-util'

const txSchema = {
  title: 'Transaction',
  type: 'object',
  properties: {
    nonce: {
      type: 'string',
      pattern: '^0x[0-9a-fA-F]{1,64}$'
    },
    gasPrice: {
      type: 'string',
      pattern: '^0x[0-9a-fA-F]{1,64}$'
    },
    gasLimit: {
      type: 'string',
      pattern: '^0x[0-9a-fA-F]{1,64}$'
    },
    to: {
      type: 'string',
      pattern: '^0x[0-9a-fA-F]{40}$'
    },
    value: {
      type: 'string',
      pattern: '^0x[0-9a-fA-F]{1,64}$'
    },
    data: {
      type: 'string',
      pattern: '^0x[0-9a-fA-F]{8}([0-9a-fA-F]{64})*$ |^0x$'
    },
    chainId: {
      type: 'integer',
      minimum: 1
    }
  },
  required: ['gasPrice', 'gasLimit', 'to', 'value', 'data']
}

export const signTx = (tx, privateKey) => {
  const ajv = new Ajv()
  const result = ajv.validate(txSchema, tx)
  if (result.error) {
    return new Error(JSON.stringify(result.error.details))
  }

  const txn = new Transaction(tx)
  if (_.isString(privateKey)) {
    privateKey = ethUtil.toBuffer(privateKey)
  }
  txn.sign(privateKey)
  return '0x' + txn.serialize().toString('hex')
}

export const buyCryptoDollarTxData = () => {
  const method = abi.methodID('buyCryptoDollar').toString('hex')
  return '0x' + method
}

export const sellCryptoDollarTxData = tokens => {
  const method = abi.methodID('sellCryptoDollar', ['uint256']).toString('hex')
  const data = abi.rawEncode(['uint'], [tokens]).toString('hex')
  return '0x' + method + data
}

export const sellUnpeggedCryptoDollarTxData = tokens => {
  const method = abi.methodID('sellUnpeggedCryptoDollar', ['uint256']).toString('hex')
  const data = abi.rawEncode(['uint'], [tokens]).toString('hex')
  return '0x' + method + data
}

export const transferCryptoDollarTxData = (amount, receiver) => {
  const method = abi.methodID('transfer', ['uint256', 'address']).toString('hex')
  const data = abi.rawEncode(['uint256', 'address'], [amount, receiver]).toString('hex')
  return '0x' + method + data
}

export const withdrawRewardsTxData = () => {
  const method = abi.methodID('withdraw').toString('hex')
  return '0x' + method
}

export const signBuyCryptoDollarTx = (sender, privateKey, tx) => {
  let data = buyCryptoDollarTxData()
  tx.from = sender
  tx.data = data
  let signedTx = signTx(tx, privateKey)
  return signedTx
}

export const signSellCryptoDollarTx = (sender, tokens, privateKey, tx) => {
  let data = buyCryptoDollarTxData(tokens)
  tx.from = sender
  tx.data = data
  let signedTx = signTx(tx, privateKey)
  return signedTx
}

export const signSellUnpeggedCryptoDollarTx = (sender, tokens, privateKey, tx) => {
  let data = buyCryptoDollarTxData()
  tx.from = sender
  tx.data = data
  let signedTx = signTx(tx, privateKey)
  return signedTx
}

export const transferCryptoDollarTx = (sender, receiver, amount, privateKey, tx) => {
  let data = buyCryptoDollarTxData()
  tx.from = sender
  tx.data = data
  let signedTx = signTx(tx, privateKey)
  return signedTx
}
