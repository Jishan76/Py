const bitcoin = require('bitcoinjs-lib');
const axios = require('axios');
const ecc = require('tiny-secp256k1');

// Set ECC to the bitcoinjs-lib
bitcoin.initEccLib(ecc);

// Function to generate a random Bitcoin private key and check balance
async function checkRandomBtcWallet() {
    // Generate a random Bitcoin private key
    const keyPair = bitcoin.ECPair.makeRandom();
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    const privateKey = keyPair.toWIF(); // Private key in Wallet Import Format (WIF)

    // Check the balance using blockchain.info API
    try {
        const response = await axios.get(`https://blockchain.info/q/addressbalance/${address}?confirmations=3`);
        const balance = response.data / 100000000; // Convert Satoshi to BTC
        
        if (balance > 0) {
            console.log(`Found wallet with balance!`);
            console.log(`Private key: ${privateKey}`);
            console.log(`Address: ${address}`);
            console.log(`Balance: ${balance} BTC`);
        } else {
            console.log(`No balance in address ${address} (Private key: ${privateKey})`);
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

// Check random wallets in a loop
for (let i = 0; i < 10; i++) {  // Check 10 random wallets
    checkRandomBtcWallet();
}
