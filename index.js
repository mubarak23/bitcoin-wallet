
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
    // P2WPKH -> payments.p2wpkh -- DONE 
    // P2SH -> payments.p2sh -- DONE 
    // P2PK -> payments.p2pk  -- DONE 
    // P2PKH -> payments.p2pkh -- DONE 
    // P2WSH -> payments.p2wsh -- DONE 
    // P2TR -> payments.p2tr
    // p2pkh

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

// createP2PKHwallet()
const keyPair = EcPair.makeRandom({ network: network})
    console.log('keyPair', keyPair)
const outputNumber = 0 
const address = "n2eYdftiPArjtpXxiyNAtbtATdfsgojXGr"
const tx = "b6fe14c20a4eebf19ef48c4f2b8299f59b3ea1d37302907a702160fd84ec0084"
const txHash = Buffer.from(tx, "hex")
const amount = 0.00068670 
const destinationAddress = "n3gxobv1r9HeGDALF28LNdpDeyqy3Xr7MU"
const txb = new bitcoin.Transaction(network)

// txb.network = bitcoin.networks.testnet
console.log('txb', txb)
txb.addInput(txHash, outputNumber)

const minerFee = 10000
const outputAmount = amount*1e8 - minerFee

// Convert destination address to Buffer
const destinationBuffer = bitcoin.address.toOutputScript(destinationAddress, bitcoin.networks.testnet);

txb.addOutput(destinationBuffer, outputAmount)
console.log('txb with in and out', txb)
txb.sign(0, keyPair)



console.log('txb', txb)
const txh = txb.build().toHex()

console.log('new Tx', newTx)
