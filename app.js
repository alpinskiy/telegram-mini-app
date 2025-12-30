// Initialize TON Connect UI
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://localhost:8080/tonconnect-manifest.json',
    buttonRootId: 'ton-connect',
});

// Get DOM elements
const connectionInfo = document.getElementById('connection-info');
const walletName = document.getElementById('wallet-name');
const walletAddress = document.getElementById('wallet-address');
const walletChain = document.getElementById('wallet-chain');

// Function to format address for display
function formatAddress(address) {
    if (!address) return '-';
    if (address.length <= 20) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

// Function to update connection info display
function updateConnectionInfo(wallet) {
    if (wallet) {
        walletName.textContent = wallet.name || 'Unknown';
        walletAddress.textContent = wallet.account.address || '-';
        walletChain.textContent = wallet.account.chain || '-';
        connectionInfo.classList.remove('hidden');
    } else {
        connectionInfo.classList.add('hidden');
        walletName.textContent = '-';
        walletAddress.textContent = '-';
        walletChain.textContent = '-';
    }
}

// Listen for connection status changes
tonConnectUI.onStatusChange((wallet) => {
    updateConnectionInfo(wallet);
});

// Check initial connection status
tonConnectUI.connectionRestored.then((wallet) => {
    if (wallet) {
        updateConnectionInfo(wallet);
    }
}).catch((error) => {
    console.error('Error restoring connection:', error);
});

