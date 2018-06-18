import ethers from 'ethers'
import { networks } from '../../config'
import { getNetworkID, getProvider } from './providers'
import { ERC20Token } from 'proof-contracts-interfaces'

export const getContract = (getState, artifact) => {
  let networkID = getNetworkID(getState)
  let provider = getProvider(getState)

  let [abi, address] = getTruffleContractParams(artifact, networkID)
  let contract = new ethers.Contract(address, abi, provider)
  return contract
}

export const getERC20Contract = (getState, tokenAddress) => {
  let networkID = getNetworkID(getState)
  let provider = getProvider(getState)
  let [abi, _] = getTruffleContractParams(ERC20Token, networkID)
  let contract = new ethers.Contract(tokenAddress, abi, provider)
  return contract
}

/**
 * @description Returns an ethers.js contract instance from a truffle artifact and a provider
 * @param artifact - truffle artifact (json file)
 * @param provider - ethers.js provider
 * @returns Web3 Contract Instance
 */
export const getContractInstance = (artifact, provider, networkID) => {
  let [abi, address] = getTruffleContractParams(artifact, networkID)
  let contract = new ethers.Contract(address, abi, provider)
  return contract
}

/**
 * @description Returns a web3 contract instance from a truffle artifact and a network ID
 * @param web3 - web3 instance
 * @param artifact - truffle artifact (json file)
 * @returns Web3 Contract Instance
 */
export const getWeb3ContractInstance = (artifact, provider) => {
  let { web3, networkID } = provider
  let params = getTruffleContractParams(artifact, networkID)
  let contract = new web3.eth.Contract(...params)
  return contract
}

/**
 * @description Returns the deployed contract address corresponding to a
 * certain contract address
 * @param artifact
 * @param networkID
 * @returns Truffle contract address
 */
export const getTruffleContractAddress = (artifact, networkID) => {
  try {
    return networks[networkID][artifact.contractName]
  } catch (error) {
    console.log(error)
  }
}

 /**
 * @description Returns the ABI (interface) of a truffle contract
 * @param artifact
 * @returns Truffle contract ABI
 */
export const getTruffleContractABI = (artifact) => (
  artifact.abi
)

/**
 * @description Returns the ABI (interface) and contract address of a deployed truffle contract
 * @param artifact
 * @param networkID
 * @returns Contract ABI and contract address
 */
export const getTruffleContractParams = (artifact, networkID) => {
  let address = getTruffleContractAddress(artifact, networkID)
  let abi = getTruffleContractABI(artifact)

  return [abi, address]
}
