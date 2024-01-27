
const bitcoin = require('bitcoinjs-lib')
const ECPairFactory = require('ecpair').default
const ecc = require('tiny-secp256k1')
const fs = require('fs');

const EcPair = ECPairFactory(ecc)

const network = bitcoin.networks.testnet

async function createP2PKHwallet() {
  try {
    const keyPair = EcPair.makeRandom({ network: network})
    console.log('keyPair', keyPair)
    // P2WPKH -> payments.p2wpkh
    // P2SH -> payments.p2sh
    // P2PK -> payments.p2pk
    // P2PKH -> payments.p2pkh
    // P2WSH -> payments.p2wsh 
    // P2TR -> payments.p2tr

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
    fs.writeFileSync('wallet.json', walletJson)
    console.log(`Wallet created and saved to wallet.json`);

  } catch (error) {
    console.log(error)
  }
}

createP2PKHwallet()