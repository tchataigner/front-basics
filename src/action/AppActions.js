import Web3 from 'web3';
import contractData from '../data/contract';

// Export Constants
export const SET_WEB3 = 'SET_WEB3';
export const APP_ERROR = 'APP_ERROR';

// Export Actions
export function eventWeb3(web3, contract) {
    return {
        type: SET_WEB3,
        web3,
        contract
    };
}

export function eventErrorApp(statusCode, error, message, from) {
    return {
        type: APP_ERROR,
        statusCode,
        error,
        message,
        from
    };
}

export function setWeb3() {
    return async (dispatch) => {
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                // Request account access if needed
                await window.ethereum.enable();
                // Acccounts now exposed
            } catch (error) {
                // User denied account access...
                return dispatch(eventErrorApp(400, "Denied access", "L'accès via Metamask a été rejeté par l'utilisateur", "setWeb3"));
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
            // Acccounts always exposed
        }
        // Non-dapp browsers...
        else {
            return dispatch(eventErrorApp(400, "MetaMask not found", "Metamask n'est pas installé sur ce navigateur", "setWeb3"));
        }

        let ContractAddress = web3.utils.toChecksumAddress(contractData.ContractAddress);

        const Contract = new web3.eth.Contract(contractData.ContractABI, ContractAddress);

        dispatch(eventWeb3(web3, Contract));
    }
}
