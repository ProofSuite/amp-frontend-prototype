import {
  TRANSFER_TOKENS_TX_STARTED,
  TRANSFER_TOKENS_TX_VALIDATED,
  TRANSFER_TOKENS_TX_ERROR,
  TRANSFER_TOKENS_TX_SENT,
  TRANSFER_TOKENS_TX_RECEIPT,
  TRANSFER_TOKENS_TX_CONFIRMED
} from '../../actions/transferTokensTxActions'

let initialState = {
  loading: false,
  error: null,
  status: 'incomplete',
  statusMessage: null,
  requiredGas: null,
  hash: null,
  receipt: null
}

const transferTokensTxReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSFER_TOKENS_TX_STARTED:
      return {
        ...state,
        loading: false,
        error: null
      }
    case TRANSFER_TOKENS_TX_VALIDATED:
      return {
        ...state,
        status: action.payload.status,
        statusMessage: action.payload.statusMessage,
        requiredGas: action.payload.requiredGas
      }
    case TRANSFER_TOKENS_TX_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        receipt: action.payload.receipt
      }
    case TRANSFER_TOKENS_TX_SENT:
      return {
        ...state,
        loading: false,
        error: null,
        receipt: null,
        hash: action.payload.hash
      }
    case TRANSFER_TOKENS_TX_RECEIPT:
      return {
        ...state,
        loading: false,
        error: null,
        receipt: action.payload.receipt
      }
    case TRANSFER_TOKENS_TX_CONFIRMED:
      return {
        ...state,
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export default transferTokensTxReducer
