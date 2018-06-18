import { combineReducers } from 'redux'
import sendEtherTxReducer from './sendEtherTx'
import transferTokensTxReducer from './transferTokensTx'
import buyCryptoDollarTxReducer from './buyCryptoDollarTx'
import sellCryptoDollarTxReducer from './sellCryptoDollarTx'
import sellUnpeggedCryptoDollarTxReducer from './sellUnpeggedCryptoDollarTx'
import transferCryptoDollarTxReducer from './transferCryptoDollarTx'
import withdrawRewardsTxReducer from './withdrawRewardsTx'

const tx = combineReducers({
  sendEther: sendEtherTxReducer,
  transferTokens: transferTokensTxReducer,
  buyCryptoDollar: buyCryptoDollarTxReducer,
  sellCryptoDollar: sellCryptoDollarTxReducer,
  sellUnpeggedCryptoDollar: sellUnpeggedCryptoDollarTxReducer,
  transferCryptoDollar: transferCryptoDollarTxReducer,
  withrawRewards: withdrawRewardsTxReducer
})

export default tx
