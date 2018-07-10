import * as pocketServices from '../services/pocketServices';

export const POCKET_REQUEST_TOKEN_LOADING ='POCKET_REQUEST_TOKEN_LOADING';
export const POCKET_REQUEST_TOKEN_ERROR ='POCKET_REQUEST_TOKEN_ERROR';
export const POCKET_REQUEST_TOKEN_SUCCESS ='POCKET_REQUEST_TOKEN_SUCCESS';

export const POCKET_ACCESS_TOKEN_LOADING ='POCKET_ACCESS_TOKEN_LOADING';
export const POCKET_ACCESS_TOKEN_ERROR='POCKET_ACCESS_TOKEN_ERROR';
export const POCKET_ACCESS_TOKEN_SUCCESS ='POCKET_ACCESS_TOKEN_SUCCESS';

export function pocketRequestError(err) {
    return {
        type: POCKET_REQUEST_TOKEN_ERROR,
        payload: err
    };
}

export function pocketRequestLoading(isLoading) {
    return {
        type: POCKET_REQUEST_TOKEN_LOADING,
        payload: isLoading
    };
}

export function pocketRequestSuccess(code) {
    return {
        type: POCKET_REQUEST_TOKEN_SUCCESS,
        payload: code,
    };
}

export function pocketAccessError(err) {
    return {
        type: POCKET_ACCESS_TOKEN_ERROR,
        payload: err
    };
}

export function pocketAccessLoading(isLoading) {
    return {
        type: POCKET_ACCESS_TOKEN_LOADING,
        payload: isLoading
    };
}

export function pocketAccessSuccess(code) {
    return {
        type: POCKET_ACCESS_TOKEN_SUCCESS,
        payload: code,
    };
}

export function getPocketRequest() {
    return (dispatch) => {
        dispatch(pocketRequestLoading(true));

        pocketServices.getRequestToken()
        .then(res => {
            if(!res.ok) {
                throw(res.statusText())
            }
            return res.json();
        })
        .then(res => {
          dispatch(pocketRequestSuccess(res.code))
          var win = window.open(pocketServices.pocketReroute(res.code, 'http://localhost:3000/close.html') , "SignIn", "");
          var pollTimer = window.setInterval(function() {
            if (win.closed !== false) {
              dispatch(getPocketAccessToken(res.code));
              window.clearInterval(pollTimer);
            }
          }, 200);
        })
        .catch(e => {
          dispatch(pocketRequestError(e))
          console.log(e);})
        .finally(() => {
          dispatch(pocketRequestLoading(false));
        }); 
    };
}

export function getPocketAccessToken(requestToken) {
    return (dispatch) => {
        dispatch(pocketAccessLoading(true));

        pocketServices.getPocketAccessToken(requestToken)
        .then(res => {
            if(!res.ok) {
                throw(res.statusText())
            }
            return res.json();
        })
        .then(res => {
          dispatch(pocketAccessSuccess(res.access_token))
        })
        .catch(e => {
          dispatch(pocketAccessError(e))
          console.log(e);})
        .finally(() => {
          dispatch(pocketAccessLoading(false));
        }); 
    };
}