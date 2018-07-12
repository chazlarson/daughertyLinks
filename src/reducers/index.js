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
export const REMOVE_LINKS = 'REMOVE_LINKS';

const reducers = reduceReducers(
    combineReducers({
        daughertyLinks : daughertyLinksReducer,
        pocket: pocketReducer,
        tabs: tabsReducer,
        links: (state = []) => state
    }),
    // cross-cutting concerns because here `state` is the whole state tree
    (state, action) => {
      const daughertyLinks = state.daughertyLinks;
      switch (action.type) {
        case UPDATE_LINKS:
          const pocket = state.pocket;
          state = {...state, links: [...daughertyLinks.items, ...pocket.pocketLinks]};
          break;
        case REMOVE_LINKS:
          state = {...state, links: [...daughertyLinks.items]};
          break;
        default:
          state = {...state};
      }

      //if(!state.links) state = {...state, links: []};
      return state;
    }
  );

export default reducers;

