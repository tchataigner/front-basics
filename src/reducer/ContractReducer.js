// Import Actions
import {
    EXAMPLE,
    ERROR
} from '../action/ContractActions';
// Initial State
const initialState = {
    data: undefined,
    response: undefined
};

const ContractReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAMPLE:
            return {
                data: action.data,
                response: {statusCode: 200, error: null, message: null, from: action.from}
            };
        case ERROR:
            return {
                data: state.data,
                response: {
                    statusCode: action.statusCode,
                    error: action.error,
                    message: action.message,
                    from: action.from
                }
            };
        default:
            return state;
    }
};

/* Selectors */

// Get showAddPost
export const getContractResponse = state => state.contract.response;

// Export Reducer
export default ContractReducer;