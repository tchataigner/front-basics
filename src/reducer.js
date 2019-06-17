/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './reducer/AppReducer';
import contract from './reducer/ContractReducer';

// Combine all reducers into one root reducer
export default combineReducers({
    app,
    contract
});
