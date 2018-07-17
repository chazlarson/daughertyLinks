import firebase from 'firebase';
import {UPDATE_LINKS} from '../reducers';
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
export const FIREBASE_LINKS_HAVE_ERROR ='FIREBASE_LINKS_HAVE_ERROR';
export const FIREBASE_LINKS_ARE_LOADING ='FIREBASE_LINKS_ARE_LOADING';
export const FIREBASE_LINKS_FETCH_DATA_SUCCESS ='FIREBASE_LINKS_FETCH_DATA_SUCCESS';

  export function initialize(){
      return (dispatch) => {
        var firebaseApp = firebase.initializeApp(config);
        return {
            type: APP_INITIALIZED,
            payload: firebaseApp
        };
      }
  }

  export function getLinks(){
      return (dispatch) => {
        dispatch({
            type: FIREBASE_LINKS_ARE_LOADING
        });

        var linksRef = firebase.database().ref('items');
        linksRef.on('value', function(snapshot) {
            //updateStarCount(postElement, snapshot.val());
            const payload = snapshot.val().sort((a, b) => a.order - b.order)
            .map(item => new link({...item, tags : item.tags || ['Daugherty']}));

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