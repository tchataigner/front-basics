// Import Actions
import { SET_WEB3, APP_ERROR } from '../action/AppActions';
// Initial State
const initialState = {
    web3: undefined,
    contract: undefined,
    response: undefined
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEB3:
            return {
                web3: action.web3,
                contract: action.contract,
                response: { statusCode: 200, error: null, message: null, from: "setWeb3" }
            };

        case APP_ERROR:
            return {
                web3: state.web3,
                contract: state.contract,
                socket: state.socket,
                response: { statusCode: action.statusCode, error: action.error, message: action.message, from: action.from }
            };
        default:
            return state;
    }
};

/* Selectors */

// Get showAddPost
export const getWeb3 = state => state.app.web3;
export const getContract = state => state.app.contract;
export const getAppResponse = state => state.app.response;

// Export Reducer
export default AppReducer;
