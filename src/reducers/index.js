import {combineReducers} from "redux";
import daughertyLinksReducer from './daugherty-link.reducer';
import tabsReducer from './tabs.reducer';

const reducers = combineReducers({
    daughertyLinks : daughertyLinksReducer,
    tabs: tabsReducer
})

export default reducers;