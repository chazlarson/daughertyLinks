import firebase from 'firebase';
import { UPDATE_LINKS } from '../reducers';
import link from '../models/link';

const config = {
    apiKey: "AIzaSyCXb7IuibXkaRnyXT9ePzDa39kHguA2-G0",
    authDomain: "daughery-links.firebaseapp.com",
    databaseURL: "https://daughery-links.firebaseio.com",
    projectId: "daughery-links",
    storageBucket: "daughery-links.appspot.com",
    messagingSenderId: "42194474938"
};

export const APP_INITIALIZED = 'APP_INITIALIZED';
export const FIREBASE_LINKS_HAVE_ERROR = 'FIREBASE_LINKS_HAVE_ERROR';
export const FIREBASE_LINKS_ARE_LOADING = 'FIREBASE_LINKS_ARE_LOADING';
export const FIREBASE_LINKS_FETCH_DATA_SUCCESS = 'FIREBASE_LINKS_FETCH_DATA_SUCCESS';
export const FIREBASE_SIGNIN_LOADING = 'FIREBASE_SIGNIN_LOADING';
export const FIREBASE_SIGNIN_ERROR = 'FIREBASE_SIGNIN_ERROR';
export const FIREBASE_SIGNIN_SUCCESS = 'FIREBASE_SIGNIN_SUCCESS';
export const FIREBASE_SIGNOUT_LOADING = 'FIREBASE_SIGNOUT_LOADING';
export const FIREBASE_SIGNOUT_ERROR = 'FIREBASE_SIGNOUT_ERROR';
export const FIREBASE_SIGNOUT_SUCCESS = 'FIREBASE_SIGNOUT_SUCCESS';

export const FIREBASE_LINKS_ARE_UPDATING = 'FIREBASE_LINKS_ARE_UPDATING';
export const FIREBASE_LINKS_UPDATED_SUCCESS = 'FIREBASE_LINKS_UPDATED_SUCCESS';
export const FIREBASE_LINKS_UPDATED_FAILED = 'FIREBASE_LINKS_UPDATED_FAILED';

export const FIREBASE_IS_ADDING_LINK = 'FIREBASE_IS_ADDING_LINK';
export const FIREBASE_LINK_ADDED_SUCCESS = 'FIREBASE_LINK_ADDED_SUCCESS';
export const FIREBASE_LINK_ADDED_FAILED = 'FIREBASE_LINK_ADDED_FAILED';

export const FIREBASE_IS_DELETING_LINK = 'FIREBASE_IS_DELETING_LINK';
export const FIREBASE_LINK_DELETED_SUCCESS = 'FIREBASE_LINK_DELETED_SUCCESS';
export const FIREBASE_LINK_DELETED_FAILED = 'FIREBASE_LINK_DELETED_FAILED';

export function initialize() {
    return (dispatch) => {
        var firebaseApp = firebase.initializeApp(config);
        dispatch({
            type: APP_INITIALIZED,
            payload: firebaseApp
        });
    }
}

export function getLinks() {
    return (dispatch) => {
        dispatch({
            type: FIREBASE_LINKS_ARE_LOADING
        });

        var linksRef = firebase.database().ref('items');
        linksRef.on('value', function (snapshot) {
            const items = snapshot.val();
            const keys = Object.keys(items);
            items.forEach((element, idx) => {
                element.key = keys[idx];
            });

            const payload =items.sort((a, b) => a.order - b.order)
                .map(item => 
                    new link({ ...item, tags: item.tags || ['Daugherty'], meta:{key: item.key} }));

            dispatch({
                type: FIREBASE_LINKS_FETCH_DATA_SUCCESS,
                payload: payload
            });
            dispatch({
                type: UPDATE_LINKS
            });
        });
    }
}

export function isAuth() {
    var usr = getUser();
    return typeof (usr) !== "undefined" && usr !== null;
}

export function getUser() {
    if (!firebase || firebase.apps.length === 0) return null;
    return firebase.auth().currentUser;
}

export function signIn() {
    return (dispatch) => {
        dispatch({
            type: FIREBASE_SIGNIN_LOADING
        });
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            dispatch({
                type: FIREBASE_SIGNIN_SUCCESS,
                payload: result
            });
        }).catch(function (error) {
            console.log("Signin Error", error);
            dispatch({
                type: FIREBASE_SIGNIN_ERROR,
                payload: error
            });
        });
    }
}

export function signOut() {
    return (dispatch) => {
        dispatch({
            type: FIREBASE_SIGNOUT_LOADING
        });

        firebase.auth().signOut().then(function () {
            dispatch({
                type: FIREBASE_SIGNOUT_SUCCESS
            });
        }).catch(function (error) {
            dispatch({
                type: FIREBASE_SIGNOUT_ERROR,
                payload: error
            });
        });
    }
}

// export function addLink() {
//     let linkData = new link {
//         title: '',
        
//     }

//     return ((dispatch) => {
//         dispatch({
//             type: FIREBASE_IS_ADDING_LINK
//         });
        
//         var linksDB = firebase.database().ref('users/' + config.messagingSenderId).set{
//             url: url,
//             title: title,
//             image: image,
//         }
//     })
// }

// export function updateLink() {
//     return;
// }

// export function deleteLink() {
//     return;
// }