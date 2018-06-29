import ethers from 'ethers'
import { getDefaultSigner } from '../helpers/signers'

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
