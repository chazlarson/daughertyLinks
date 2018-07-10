import {combineReducers} from "redux";
import daughertyLinksReducer from './daugherty-link.reducer';
import pocketAuthReducer from './pocket-auth.reducer';

const reducers = combineReducers({
    daughertyLinks : daughertyLinksReducer,
    pocketAuth: pocketAuthReducer,
})

export default reducers;