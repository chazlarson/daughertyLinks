import {combineReducers} from "redux";
import daughertyLinksReducer from './daugherty-link.reducer';
import pocketAuthReducer from './pocket-auth.reducer';
import tabsReducer from './tabs.reducer';


const reducers = combineReducers({
    daughertyLinks : daughertyLinksReducer,
    pocketAuth: pocketAuthReducer,
    tabs: tabsReducer
})

export default reducers;