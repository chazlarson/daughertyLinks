import {combineReducers} from "redux";
import reduceReducers from "reduce-reducers";
import daughertyLinksReducer from './daugherty-link.reducer';
import pocketReducer from './pocket.reducer';
import tabsReducer from './tabs.reducer';


/*const reducers = combineReducers({
    daughertyLinks : daughertyLinksReducer,
    pocket: pocketReducer,
    tabs: tabsReducer
})*/
export const UPDATE_LINKS = 'UPDATE_LINKS';

const reducers = reduceReducers(
    combineReducers({
        daughertyLinks : daughertyLinksReducer,
        pocket: pocketReducer,
        tabs: tabsReducer,
        links: (state = []) => state
    }),
    // cross-cutting concerns because here `state` is the whole state tree
    (state, action) => {
      switch (action.type) {
        case UPDATE_LINKS:
          const daughertyLinks = state.daughertyLinks;
          const pocket = state.pocket;
          state = {...state, links: [...state.daughertyLinks.items, ...state.pocket.pocketLinks]};
      }

      //if(!state.links) state = {...state, links: []};
      return state;
    }
  );

export default reducers;

