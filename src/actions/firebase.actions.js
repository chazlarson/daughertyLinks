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
            //updateStarCount(postElement, snapshot.val());
            const payload = snapshot.val().sort((a, b) => a.order - b.order)
                .map(item => new link({ ...item, tags: item.tags || ['Daugherty'] }));

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
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("Good signin", { ...firebase });
            dispatch({
                type: FIREBASE_SIGNIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            });
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log("Error", error);
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