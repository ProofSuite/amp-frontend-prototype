import ethers from 'ethers'
import { getDefaultSigner } from '../helpers/signers'
// import { WETH } from 'proof-contracts-interfaces'

export const CONVERT_ETHER_TO_WETH_TX_STARTED = 'CONVERT_ETHER_TO_WETH_TX_STARTED'
export const CONVERT_ETHER_TO_WETH_TX_ERROR = 'CONVERT_ETHER_TO_WETH_TX_ERROR'
export const CONVERT_ETHER_TO_WETH_TX_VALIDATED = 'CONVERT_ETHER_TO_WETH_TX_VALIDATED'
export const CONVERT_ETHER_TO_WETH_TX_SENT = 'CONVERT_ETHER_TO_WETH_TX_SENT'
export const CONVERT_ETHER_TO_WETH_TX_RECEIPT = 'CONVERT_ETHER_TO_WETH_TX_RECEIPT'
export const CONVERT_ETHER_TO_WETH_TX_CONFIRMED = 'CONVERT_ETHER_TO_WETH_TX_CONFIRMED'

export const convertEtherToWethTxStarted = () => ({
  type: CONVERT_ETHER_TO_WETH_TX_STARTED
})
export const convertEtherToWethTxError = (error, receipt) => ({
  type: CONVERT_ETHER_TO_WETH_TX_ERROR,
  payload: { error, receipt }
})
export const convertEtherToWethTxValidated = notification => ({
  type: CONVERT_ETHER_TO_WETH_TX_VALIDATED,
  payload: notification
})
export const convertEtherToWethTxSent = hash => ({
  type: CONVERT_ETHER_TO_WETH_TX_SENT,
  payload: { hash }
})
export const convertEtherToWethTxReceipt = receipt => ({
  type: CONVERT_ETHER_TO_WETH_TX_RECEIPT,
  payload: { receipt }
})
export const convertEtherToWethTxConfirmed = confirmationNumber => ({
  type: CONVERT_ETHER_TO_WETH_TX_CONFIRMED,
  payload: confirmationNumber
})

export const validateConvertEtherToWethTx = ({ amount, receiver, gas, gasPrice }) => {
  return async (dispatch, getState) => {
    try {
      gasPrice = gasPrice || 2 * 10e9
      gas = gas || 0

      let signer = await getDefaultSigner(getState)

      let tx = {
        gasLimit: gas,
        gasPrice: gasPrice,
        to: receiver,
        value: ethers.utils.parseEther(amount)
      }

      let estimateGas = await signer.provider.estimateGas(tx)
      let notification = { status: 'valid', statusMessage: 'Transaction Valid', requiredGas: estimateGas.toNumber() }
      return dispatch(convertEtherToWethTxValidated(notification))
    } catch (error) {
      console.log(error)
      let notification = { status: 'invalid', statusMessage: error.message }
      return dispatch(convertEtherToWethTxValidated(notification))
    }
  }
}

export const sendConvertEtherToWethTx = ({ value, receiver, gas, gasPrice }) => {
  return async (dispatch, getState) => {
    try {
      gasPrice = gasPrice || 2 * 10e9
      gas = gas || 0

      let signer = await getDefaultSigner(getState)

      let rawTx = {
        gasLimit: gas,
        gasPrice: gasPrice,
        to: receiver,
        value: value * 10 ** 18
      }

      let tx = await signer.sendTransaction(rawTx)
      dispatch(convertEtherToWethTxSent(tx.hash))

      let receipt = await signer.provider.waitForTransaction(tx.hash)
      if (receipt.status === '0x0') {
        return dispatch(convertEtherToWethTxReceipt('Transaction Failed', receipt))
      } else {
        return dispatch(convertEtherToWethTxReceipt(receipt))
      }
    } catch (error) {
      console.log(error)
      dispatch(convertEtherToWethTxError(error.message))
    }
  }
}



export const SEND_ETHER_TX_STARTED = 'SEND_ETHER_TX_STARTED'
export const SEND_ETHER_TX_ERROR = 'SEND_ETHER_TX_ERROR'
export const SEND_ETHER_TX_SIGNING = 'SEND_ETHER_TX_SIGNING'
export const SEND_ETHER_TX_SIGNED = 'SEND_ETHER_TX_SIGNED'
export const SEND_ETHER_TX_SIGNING_ERROR = 'SEND_ETHER_TX_SIGNING_ERROR'
export const SEND_ETHER_TX_VALIDATED = 'SEND_ETHER_TX_VALIDATED'
export const SEND_ETHER_TX_SENT = 'SEND_ETHER_TX_SENT'
export const SEND_ETHER_TX_RECEIPT = 'SEND_ETHER_TX_RECEIPT'
export const SEND_ETHER_TX_CONFIRMED = 'SEND_ETHER_TX_CONFIRMED'

export const transferTokensTxStarted = () => ({
  type: SEND_ETHER_TX_STARTED
})
export const transferTokensTxError = (error, receipt) => ({
  type: SEND_ETHER_TX_ERROR,
  payload: { error, receipt }
})
export const transferTokensTxSigningError = error => ({
  type: SEND_ETHER_TX_SIGNING_ERROR,
  payload: { error }
})
export const transferTokensTxValidated = notification => ({
  type: SEND_ETHER_TX_VALIDATED,
  payload: notification
})
export const transferTokensTxSigning = () => ({
  type: SEND_ETHER_TX_SIGNING
})
export const transferTokensTxSigned = signature => ({
  type: SEND_ETHER_TX_SIGNED,
  payload: { signature }
})
export const transferTokensTxSent = hash => ({
  type: SEND_ETHER_TX_SENT,
  payload: { hash }
})
export const transferTokensTxReceipt = receipt => ({
  type: SEND_ETHER_TX_RECEIPT,
  payload: { receipt }
})
export const transferTokensTxConfirmed = confirmationNumber => ({
  type: SEND_ETHER_TX_CONFIRMED,
  payload: confirmationNumber
})

export const validateTransferTokensTx = ({ receiver, amount, gas, gasPrice, tokenAddress }) => {
  return async (dispatch, getState) => {
    try {
      gasPrice = gasPrice || 2 * 10e9
      gas = gas || 0

      let signer = await getDefaultSigner(getState)
      let token = new ethers.Contract(tokenAddress, ERC20Token.abi, signer)

      let estimatedGas = await token.estimate.transfer(receiver, amount)

      let notification = { status: 'valid', statusMessage: 'Transaction Valid', requiredGas: estimatedGas.toNumber() }
      return dispatch(transferTokensTxValidated(notification))
    } catch (error) {
      console.log(error)
      let notification = { status: 'invalid', statusMessage: error.message }
      return dispatch(transferTokensTxValidated(notification))
    }
  }
}

export const sendTransferTokensTx = ({ receiver, amount, gas, gasPrice, tokenAddress }) => {
  return async (dispatch, getState) => {
    try {
      gasPrice = gasPrice || 2 * 10e9
      gas = gas || 0

      let signer = await getDefaultSigner(getState)
      let params = {
        gasLimit: gas,
        gasPrice: gasPrice
      }

      let token = new ethers.Contract(tokenAddress, ERC20Token.abi, signer)
      let tx = await token.transfer(receiver, amount, params)
      dispatch(transferTokensTxSent(tx.hash))

      let receipt = await signer.provider.waitForTransaction(tx.hash)

      if (receipt.status === '0x0') {
        return dispatch(transferTokensTxError('Transaction Failed', receipt))
      } else {
        return dispatch(transferTokensTxReceipt(receipt))
      }
    } catch (error) {
      console.log(error)
      dispatch(transferTokensTxError(error.message))
    }
  }
}

export const signTransferTokensTx = ({ receiver, amount, gas, gasPrice, tokenAddress }) => {}
// export const signTransferTokensTx = ({ receiver, amount, gas, gasPrice, tokenAddress }) => {
//   return async (dispatch, getState) => {
//     try {
//       gasPrice = gasPrice || 2 * 10e9
//       gas = gas || 0

//       let signer = getDefaultSigner(getState)

//       let tx = {
//         gasLimit: gas,
//         gasPrice: gasPrice,
//         to: receiver
//       }

//       let token = new ethers.Contract(tokenAddress, ERC20Token, signer)
//       let estimatedGas = await token.estimate.transfer(receiver, amount)

//       return dispatch()

//       return dispatch(transferTokensTxSigned(signedTx))

//       let signedTx = await signer.sign(tx)
//       dispatch(transferTokensTxSigned(signedTx))
//     } catch (error) {
//       console.log(error)
//       dispatch(transferTokensTxError(error.message))
//     }
//   }
// }
