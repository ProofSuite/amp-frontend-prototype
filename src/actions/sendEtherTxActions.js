import ethers from 'ethers'
import { getDefaultSigner } from '../helpers/signers'

export const SEND_ETHER_TX_STARTED = 'SEND_ETHER_TX_STARTED'
export const SEND_ETHER_TX_ERROR = 'SEND_ETHER_TX_ERROR'
export const SEND_ETHER_TX_SIGNING = 'SEND_ETHER_TX_SIGNING'
export const SEND_ETHER_TX_SIGNED = 'SEND_ETHER_TX_SIGNED'
export const SEND_ETHER_TX_SIGNING_ERROR = 'SEND_ETHER_TX_SIGNING_ERROR'
export const SEND_ETHER_TX_VALIDATED = 'SEND_ETHER_TX_VALIDATED'
export const SEND_ETHER_TX_SENT = 'SEND_ETHER_TX_SENT'
export const SEND_ETHER_TX_RECEIPT = 'SEND_ETHER_TX_RECEIPT'
export const SEND_ETHER_TX_CONFIRMED = 'SEND_ETHER_TX_CONFIRMED'

export const etherTxStarted = () => ({
  type: SEND_ETHER_TX_STARTED
})
export const etherTxError = (error, receipt) => ({
  type: SEND_ETHER_TX_ERROR,
  payload: { error, receipt }
})
export const etherTxSigningError = error => ({
  type: SEND_ETHER_TX_SIGNING_ERROR,
  payload: { error }
})
export const etherTxValidated = notification => ({
  type: SEND_ETHER_TX_VALIDATED,
  payload: notification
})
export const etherTxSigning = () => ({
  type: SEND_ETHER_TX_SIGNING
})
export const etherTxSigned = signature => ({
  type: SEND_ETHER_TX_SIGNED,
  payload: { signature }
})
export const etherTxSent = hash => ({
  type: SEND_ETHER_TX_SENT,
  payload: { hash }
})
export const etherTxReceipt = receipt => ({
  type: SEND_ETHER_TX_RECEIPT,
  payload: { receipt }
})
export const etherTxConfirmed = confirmationNumber => ({
  type: SEND_ETHER_TX_CONFIRMED,
  payload: confirmationNumber
})

export const validateEtherTx = ({ amount, receiver, gas, gasPrice }) => {
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
      return dispatch(etherTxValidated(notification))
    } catch (error) {
      console.log(error)
      let notification = { status: 'invalid', statusMessage: error.message }
      return dispatch(etherTxValidated(notification))
    }
  }
}

export const signEtherTx = ({ value, receiver, gas, gasPrice }) => {
  return async (dispatch, getState) => {
    try {
      gasPrice = gasPrice || 2 * 10e9
      gas = gas || 0

      let signer = getDefaultSigner(getState)

      let tx = {
        gasLimit: gas,
        gasPrice: gasPrice,
        to: receiver,
        value: value * 10 ** 18
      }

      let signedTx = await signer.sign(tx)
      dispatch(etherTxSigned(signedTx))
    } catch (error) {
      console.log(error)
      dispatch(etherTxError(error.message))
    }
  }
}

export const sendEtherTx = ({ value, receiver, gas, gasPrice }) => {
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
      dispatch(etherTxSent(tx.hash))

      let receipt = await signer.provider.waitForTransaction(tx.hash)
      if (receipt.status === '0x0') {
        return dispatch(etherTxError('Transaction Failed', receipt))
      } else {
        return dispatch(etherTxReceipt(receipt))
      }
    } catch (error) {
      console.log(error)
      dispatch(etherTxError(error.message))
    }
  }
}
