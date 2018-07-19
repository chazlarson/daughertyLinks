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

export const FIREBASE_ISADMIN_SUCCESS = 'FIREBASE_ISADMIN_LOADING';
export const FIREBASE_ISADMIN_LOADING = 'FIREBASE_ISADMIN_SUCCESS';

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

            dispatch(checkAdmin());
            dispatch({
                type: UPDATE_LINKS
            });
        });
    }
}

export function checkAdmin() {
    return (dispatch) => {
        dispatch({
            type: FIREBASE_ISADMIN_LOADING
        });

        const user = getUser();
        if(user === null){
            dispatch({
                type: FIREBASE_ISADMIN_SUCCESS,
                payload: false
            })
            return;
        }
        const linksRef = firebase.database().ref(`users/${user.uid}/roles`);
        linksRef.on('value', function (snapshot) {
            const roles = snapshot.val();
            let isAdmin = roles && roles.admin;

            dispatch({
                type: FIREBASE_ISADMIN_SUCCESS,
                payload: isAdmin
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
            dispatch(checkAdmin());
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
            dispatch(checkAdmin());
        }).catch(function (error) {
            dispatch({
                type: FIREBASE_SIGNOUT_ERROR,
                payload: error
            });
        });
    }
}

export function updateLinks(updateArray) {
    // Get a new key
    return (dispatch) => {
        dispatch({
            type: FIREBASE_LINKS_ARE_UPDATING
        });

        let newLinkKey = '';
    
        let updates = {};
        let linkData = {
            title: '',
            link: '',
            order: '',
            tags: [],
            image: '',
        }

        for(let x=0; x < updateArray.length; x++) {
            
            
            if (!updateArray[x].meta.delete) {
                (updateArray[x].title) ? linkData.title = updateArray[x].title : linkData.title = '';
                (updateArray[x].link) ? linkData.link = updateArray[x].link : linkData.link = '';
                if (updateArray[x].order) { 
                    linkData.order = updateArray[x].order;
                }
                (updateArray[x].image) ? linkData.image = updateArray[x].image : linkData.image = '';
                (updateArray[x].tags) ? linkData.tags = updateArray[x].tags : linkData.tags = [];

                if (!updateArray[x].meta.key) {
                    newLinkKey = firebase.database().ref().child('items').push().key;
                    updates[`items/${newLinkKey}`] = linkData;
                } else {
                    updates[`items/${updateArray[x].meta.key}`] = linkData;
                }
            } else {
                linkData.title = null;
                linkData.image = null;
                linkData.order = null;
                linkData.tags = null;
                linkData.link = null;

                updates[`items/${updateArray[x].meta.key}`] = linkData;
            }
        }

        if(updates) {
            firebase.database().ref().update(updates)
            .then(function () {
                dispatch({ 
                    type: FIREBASE_LINKS_UPDATED_SUCCESS,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: FIREBASE_LINKS_UPDATED_FAILED,
                    payload: error,
                })
            })
        }
    }

    
}