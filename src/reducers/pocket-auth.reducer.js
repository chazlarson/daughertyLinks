import * as pocketAuthActions from '../actions/pocket-auth.actions'

const defaultState = {
    isLoading: false,
    error: null,
    reqToken: {},
    authToken: {},
};

const pocketAuthReducer = (state = defaultState, action) => {
    switch (action.type){
        case pocketAuthActions.POCKET_REQUEST_TOKEN_LOADING:{
            state = {...state, isLoading: action.payload, error: null};
            break;
        }
        case pocketAuthActions.POCKET_REQUEST_TOKEN_SUCCESS: {
          state = {...state, reqToken: action.payload, error: null};
          break;
        }
        case pocketAuthActions.POCKET_REQUEST_TOKEN_ERROR: {
          state = {...state, error: action.payload};
          break;
        }
        case pocketAuthActions.POCKET_ACCESS_TOKEN_LOADING:{
          state = {...state, isLoading: action.payload, error: null};
          break;
      }
        case pocketAuthActions.POCKET_ACCESS_TOKEN_SUCCESS: {
          state = {...state, authToken: action.payload, error: null};
          break;
      }
        case pocketAuthActions.POCKET_ACCESS_TOKEN_ERROR: {
          state = {...state, error: action.payload};
          break;
      }
        default:{
            return state;
        }
    }
    return state;
}

export default pocketAuthReducer;