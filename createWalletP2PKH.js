
const bitcoin = require('bitcoinjs-lib')
const ECPairFactory = require('ecpair').default
const ecc = require('tiny-secp256k1')
const fs = require('fs');

const EcPair = ECPairFactory(ecc)

const network = bitcoin.networks.testnet

async function createWalletP2PKH() {
  try {
    const keyPair = EcPair.makeRandom({ network: network})
    // P2WPKH -> payments.p2wpkh
    
    console.log('keyPair.publicKey', keyPair.publicKey)
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: network
    })
    console.log('address', address)

    const privateKey = keyPair.toWIF()
    console.log('Private Key', privateKey)

    const wallet = {
      address: address,
      privateKey: privateKey
    }
    console.log('wallet', wallet)
    const walletJson = JSON.stringify(wallet, null, 4)
    fs.writeFileSync('createWalletP2PKH.json', walletJson)
    console.log(`createWalletP2PKH Wallet created and saved to wallet.json`);

  } catch (error) {
    console.log(error)
  }
}

createWalletP2PKH()