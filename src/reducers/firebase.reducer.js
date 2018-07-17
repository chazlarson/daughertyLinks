import * as fba from '../actions/firebase.actions';

const defaultState = {
    isAuth: false
};

const firebaseReducer = (state = defaultState, action) => {
    switch (action.type){
        case fba.APP_INITIALIZED:{
            state = {...state, app: action.payload, isAuth: fba.isAuth()};
            break;
        }
        case fba.FIREBASE_LINKS_FETCH_DATA_SUCCESS:{
            state = {...state, firebaseLinks: action.payload, isAuth: fba.isAuth()};
            break;
        }
        case fba.FIREBASE_SIGNIN_SUCCESS:{
            state = {...state, isAuth: fba.isAuth()};
            break;
        }
        case fba.FIREBASE_SIGNOUT_SUCCESS:{
            state = {...state, isAuth: fba.isAuth()};
            break;
        }
        default:{
            break;
        }
    }
    return state;
}

export default firebaseReducer;