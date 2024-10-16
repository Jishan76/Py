const ethers = require('ethers');
const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const axios = require('axios');

// Function to generate a random private key for Ethereum and check balance
async function checkRandomEthereumWallet() {
    try {
        const randomWallet = ethers.Wallet.createRandom(); // Generate random Ethereum wallet
        const provider = ethers.getDefaultProvider(); // Connect to Ethereum mainnet
        const balance = await provider.getBalance(randomWallet.address);

        // Convert balance to ethers and check if greater than 0
        const balanceInEth = ethers.utils.formatEther(balance);

        if (parseFloat(balanceInEth) > 0) {
            console.log(`Ethereum Wallet Found! Address: ${randomWallet.address}, Private Key: ${randomWallet.privateKey}, Balance: ${balanceInEth} ETH`);
        } else {
            console.log(`Ethereum Wallet ${randomWallet.address} has 0 balance.`);
        }
    } catch (error) {
        console.error("Error checking Ethereum wallet:", error.message);
    }
}

// Function to generate a random private key for Bitcoin and check balance
async function checkRandomBitcoinWallet() {
    try {
        const mnemonic = bip39.generateMnemonic(); // Generate a mnemonic
        const seed = await bip39.mnemonicToSeed(mnemonic); // Convert to seed
        const root = bitcoin.bip32.fromSeed(seed); // Generate BIP32 root key

        // Derive the first Bitcoin address (BIP44 path m/44'/0'/0'/0/0)
        const account = root.derivePath("m/44'/0'/0'/0/0");
        const { address } = bitcoin.payments.p2pkh({ pubkey: account.publicKey });

        // Fetch balance from a public Bitcoin API
        const apiURL = `https://blockchain.info/q/addressbalance/${address}?confirmations=6`;
        const response = await axios.get(apiURL);
        const balance = response.data / 100000000; // Convert satoshi to BTC

        if (balance > 0) {
            console.log(`Bitcoin Wallet Found! Address: ${address}, Private Key: ${account.toWIF()}, Balance: ${balance} BTC`);
        } else {
            console.log(`Bitcoin Wallet ${address} has 0 balance.`);
        }
    } catch (error) {
        console.error("Error checking Bitcoin wallet:", error.message);
    }
}

// Check random wallets
checkRandomEthereumWallet();
checkRandomBitcoinWallet();
