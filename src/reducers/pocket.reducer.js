import * as pocketActions from '../actions/pocket.actions'

const defaultState = {
    isLoading: false,
    error: null,
    reqToken: {},
    accessToken: '',
    pocketLinks: []
};

const pocketReducer = (state = defaultState, action) => {
    switch (action.type){
        case pocketActions.POCKET_REQUEST_TOKEN_LOADING:{
            state = {...state, isLoading: action.payload, error: null};
            break;
        }
        case pocketActions.POCKET_REQUEST_TOKEN_SUCCESS: {
          state = {...state, reqToken: action.payload, error: null};
          break;
        }
        case pocketActions.POCKET_REQUEST_TOKEN_ERROR: {
          state = {...state, error: action.payload};
          break;
        }
        case pocketActions.POCKET_ACCESS_TOKEN_LOADING:{
          state = {...state, isLoading: action.payload, error: null};
          break;
      }
        case pocketActions.POCKET_ACCESS_TOKEN_SUCCESS: {
          state = {...state, accessToken: action.payload, error: null};
          break;
      }
        case pocketActions.POCKET_ACCESS_TOKEN_ERROR: {
          state = {...state, error: action.payload};
          break;
      }
        case pocketActions.POCKET_GET_LINKS_LOADING:{
            state = {...state, isLoading: action.payload, error: null};
            break;
        }
        case pocketActions.POCKET_GET_LINKS_SUCCESS: {
            state = {...state, pocketLinks: action.payload, error: null};
            break;
        }
        case pocketActions.POCKET_GET_LINKS_ERROR: {
            state = {...state, error: action.payload};
            break;
        }
        case pocketActions.REMOVE_POCKET_DATA: {
            state = {...state, reqToken: {}, accessToken: '', pocketLinks: []};
            break;
        }
        default:{
            return state;
        }
    }
    return state;
}

export default pocketReducer;