import { Wallet } from 'ethers'
import { getProvider, getProviderType } from './providers'
import { getDefaultWalletAddress, getWalletFromSessionStorage } from './wallets'

export const PrivateKeySigner = (privateKey, provider) => {
  this.wallet = new Wallet(privateKey)
  this.provider = provider
  this.getAddress = async () => {
    return this.wallet.address
  }

  this.sign = async (tx) => {
    // TODO
  }

  return {
    provider: this.provider,
    getAddress: this.getAddress,
    sign: this.sign
  }
}

export const WalletSigner = (wallet, provider) => {
  this.getAddress = async () => {
    return wallet.address
  }

  this.sign = async () => {
    // TODO
  }

  return {
    provider: this.wallet,
    getAddress: this.getAddress,
    sign: this.sign
  }
}

export const MetamaskSigner = async (provider, accountIndex) => {
  let accounts = await provider.listAccounts()
  let signer = provider.getSigner(accounts[accountIndex])

  return signer
}

export const LocalSigner = async (provider) => {
  let accounts = await provider.listAccounts()
  let signer = provider.getSigner(accounts[0])

  return signer
}

export const getDefaultSigner = async (getState) => {
  let signer
  let provider = getProvider(getState)
  let providerType = getProviderType(getState)

  if (providerType === 'metamask') {
    signer = await MetamaskSigner(provider, 0)
  } else if (providerType === 'infura') {
    let address = getDefaultWalletAddress(getState)
    let wallet = getWalletFromSessionStorage(address)
    signer = WalletSigner(wallet, provider)
  } else if (providerType === 'local') {
    signer = LocalSigner(provider)
  }

  return signer
}
