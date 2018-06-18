
import {
  SEND_ETHER_TX_STARTED,
  SEND_ETHER_TX_VALIDATED,
  SEND_ETHER_TX_ERROR,
  SEND_ETHER_TX_SENT,
  SEND_ETHER_TX_RECEIPT,
  SEND_ETHER_TX_CONFIRMED
} from '../../actions/sendEtherTxActions'

let initialState = {
  loading: false,
  error: null,
  status: 'incomplete',
  statusMessage: null,
  requiredGas: null,
  hash: null,
  receipt: null
}

const sendEtherTxReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ETHER_TX_STARTED:
      return {
        ...state,
        loading: false,
        error: null
      }
    case SEND_ETHER_TX_VALIDATED:
      return {
        ...state,
        status: action.payload.status,
        statusMessage: action.payload.statusMessage,
        requiredGas: action.payload.requiredGas
      }
    case SEND_ETHER_TX_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        receipt: action.payload.receipt
      }
    case SEND_ETHER_TX_SENT:
      return {
        ...state,
        loading: false,
        error: null,
        receipt: null,
        hash: action.payload.hash
      }
    case SEND_ETHER_TX_RECEIPT:
      return {
        ...state,
        loading: false,
        error: null,
        receipt: action.payload.receipt
      }
    case SEND_ETHER_TX_CONFIRMED:
      return {
        ...state,
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export default sendEtherTxReducer
