
const bitcoin = require('bitcoinjs-lib')
const ECPairFactory = require('ecpair').default
const ecc = require('tiny-secp256k1')
const fs = require('fs');

const EcPair = ECPairFactory(ecc)

const network = bitcoin.networks.testnet

async function createWalletWithP2PK() {
  try {
    const keyPair = EcPair.makeRandom({ network: network})
   
    console.log('keyPair.publicKey', keyPair.publicKey)
   
    // P2WPKH -> payments.p2wpkh

    const { address } = bitcoin.payments.p2pk({
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
    fs.writeFileSync('createWalletWithP2PK.json', walletJson)
    console.log(`createWalletWithP2PK Wallet created and saved to wallet.json`);

  } catch (error) {
    console.log(error)
  }
}

createWalletWithP2PK()