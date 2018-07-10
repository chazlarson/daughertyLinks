import * as daughertyLinksActions from '../actions/daugherty-links.actions'

const defaultState = {
    isLoading: false,
    isError: false,
    error: null,
    items: []
};

const daughertyLinksReducer = (state = defaultState, action) => {
    switch (action.type){
        case daughertyLinksActions.DAUGHERTY_LINKS_FETCH_DATA_SUCCESS:{
            state = {...state, items: [...action.payload], error: null, isError: false}
            break;
        }
        case daughertyLinksActions.DAUGHERTY_LINKS_ARE_LOADING:{
            state = {...state, isLoading: action.payload}
            break;
        }
        case daughertyLinksActions.DAUGHERTY_LINKS_HAVE_ERROR:{
            let err = action.payload;
            
            state = {...state,  error: err, isError: true}
            console.log(err);
            break;
        }
        default:{
            return state;
        }
    }
    return state;
}

export default daughertyLinksReducer;