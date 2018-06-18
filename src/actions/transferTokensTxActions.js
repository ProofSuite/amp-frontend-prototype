import ethers from 'ethers'
import { getDefaultSigner } from '../helpers/signers'
import { ERC20Token } from 'proof-contracts-interfaces'

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
