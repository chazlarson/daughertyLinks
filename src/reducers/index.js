import {combineReducers} from "redux";
import daughertyLinksReducer from './daugherty-link.reducer';

const reducers = combineReducers({
    daughertyLinks : daughertyLinksReducer
})

export default reducers;