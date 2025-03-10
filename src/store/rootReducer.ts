import { combineReducers } from "@reduxjs/toolkit";
import { reducer as organizationsReducer } from '../../src/slices/organizations'

const rootReducer = combineReducers({
    organizations: organizationsReducer
});

export default rootReducer;