import {APP_INITIALIZED, FIREBASE_LINKS_FETCH_DATA_SUCCESS } from '../actions/firebase.actions';

const defaultState = {
};

const firebaseReducer = (state = defaultState, action) => {
    switch (action.type){
        case APP_INITIALIZED:{
            state = {...state, app: action.payload};
            break;
        }
        case FIREBASE_LINKS_FETCH_DATA_SUCCESS:{
            state = {...state, firebaseLinks: action.payload};
        }
        default:{
            break;
        }
    }
    return state;
}

export default firebaseReducer;