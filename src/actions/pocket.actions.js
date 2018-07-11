import * as pocketServices from '../services/pocket.service';
import link from '../models/link';

export const POCKET_REQUEST_TOKEN_LOADING ='POCKET_REQUEST_TOKEN_LOADING';
export const POCKET_REQUEST_TOKEN_ERROR ='POCKET_REQUEST_TOKEN_ERROR';
export const POCKET_REQUEST_TOKEN_SUCCESS ='POCKET_REQUEST_TOKEN_SUCCESS';

export const POCKET_ACCESS_TOKEN_LOADING ='POCKET_ACCESS_TOKEN_LOADING';
export const POCKET_ACCESS_TOKEN_ERROR='POCKET_ACCESS_TOKEN_ERROR';
export const POCKET_ACCESS_TOKEN_SUCCESS ='POCKET_ACCESS_TOKEN_SUCCESS';

export const POCKET_GET_LINKS_LOADING ='POCKET_GET_LINKS_LOADING';
export const POCKET_GET_LINKS_ERROR='POCKET_GET_LINKS_ERROR';
export const POCKET_GET_LINKS_SUCCESS ='POCKET_GET_LINKS_SUCCESS';

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


export function pocketGetLinksError(err) {
    return {
        type: POCKET_GET_LINKS_ERROR,
        payload: err
    };
}

export function pocketGetLinksLoading(isLoading) {
    return {
        type: POCKET_GET_LINKS_LOADING,
        payload: isLoading
    };
}

export function pocketGetLinksSuccess(code) {
    return {
        type: POCKET_GET_LINKS_SUCCESS,
        payload: code,
    };
}

export function getPocketRequest() {
    return (dispatch) => {
        dispatch(pocketRequestLoading(true));

        pocketServices.getRequestToken()
        .then(res => {
            if(!res.ok) {
                throw(res.statusText)
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
          console.log(e);});
    };
}

export function getPocketAccessToken(requestToken) {
    return (dispatch) => {
        dispatch(pocketAccessLoading(true));

        pocketServices.getPocketAccessToken(requestToken)
        .then(res => {
            if(!res.ok) {
                throw(res.statusText)
            }
            return res.json();
        })
        .then(res => {
          dispatch(pocketAccessSuccess(res.access_token))
          dispatch(getPocketLinks(res.access_token));
        })
        .catch(e => {
          dispatch(pocketAccessError(e))
          console.log(e);});
    };
}

export function getPocketLinks(accessToken) {
    return (dispatch) => {
        dispatch(pocketGetLinksLoading(true));

        pocketServices.getPocketLinks(accessToken)
        .then(res => {
            if(!res.ok) {
                throw(res.statusText)
            }
            return res.json();
        })
        .then(res => {
          dispatch(pocketGetLinksSuccess(mapLinks(res)));
        })
        .catch(e => {
          dispatch(pocketGetLinksError(e))
          console.log(e);})
        .finally(() => {
          dispatch(pocketGetLinksLoading(false));
        }); 
    };
}

function mapLinks(links) {
    const mappedLinks = []; 
    if(links.list){
        return Object.values(links.list).map((linkData) => {
            return new link({
                link: linkData.resolved_url,
                title: linkData.resolved_title,
                image: (linkData.image && linkData.image.src) || '',
                order: linkData.sort_id,
                tags: Object.keys(linkData.tags).filter(tag => tag !== 'daugherty'),
            })
        })
    }
    return mappedLinks;
}