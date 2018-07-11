import {combineReducers} from "redux";
import daughertyLinksReducer from './daugherty-link.reducer';
import pocketReducer from './pocket.reducer';
import tabsReducer from './tabs.reducer';


const reducers = combineReducers({
    daughertyLinks : daughertyLinksReducer,
    pocket: pocketReducer,
    tabs: tabsReducer
})

export default reducers;