from bitcoinlib.keys import Key
from bitcoinlib.wallets import HDWallet
from bitcoinlib.keys import Address
import random

# Function to generate a random private key and check Bitcoin balance
def check_random_btc_wallet():
    # Generate a random private key
    private_key = Key().private_hex
    
    # Create a temporary wallet using the private key
    wallet = HDWallet.create(name='TempWallet', keys=private_key, network='bitcoin')
    
    # Get the address from the wallet
    btc_address = wallet.get_key().address

    # Check balance of the Bitcoin address
    balance = Address(btc_address).balance()

    # Print the private key and balance if balance is greater than zero
    if balance > 0:
        print(f"Found wallet with balance!")
        print(f"Private key: {private_key}")
        print(f"Address: {btc_address}")
        print(f"Balance: {balance} BTC")
    else:
        print(f"No balance in address {btc_address} (Private key: {private_key})")

# Check random wallets in a loop
for _ in range(10):  # Check 10 random wallets
    check_random_btc_wallet()
