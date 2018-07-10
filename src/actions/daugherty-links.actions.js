import * as daughertyLinksService from '../services/daugherty-links';
import link from '../models/link';

export const DAUGHERTY_LINKS_HAVE_ERROR ='DAUGHERTY_LINKS_HAVE_ERROR';
export const DAUGHERTY_LINKS_ARE_LOADING ='DAUGHERTY_LINKS_ARE_LOADING';
export const DAUGHERTY_LINKS_FETCH_DATA_SUCCESS ='DAUGHERTY_LINKS_FETCH_DATA_SUCCESS';


export function daughertyLinksHaveError(err) {
    return {
        type: DAUGHERTY_LINKS_HAVE_ERROR,
        payload: err
    };
}

export function daughertyLinksAreLoading(isLoading) {
    return {
        type: DAUGHERTY_LINKS_ARE_LOADING,
        payload: isLoading
    };
}

export function daughertyLinksFetchDataSuccess(items) {
    return {
        type: DAUGHERTY_LINKS_FETCH_DATA_SUCCESS,
        payload: items
    };
}

export function getDaughertyLinks() {
    return (dispatch) => {
        dispatch(daughertyLinksAreLoading(true));

        daughertyLinksService.getDaughertyLinks()
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(resp => {
                dispatch(daughertyLinksAreLoading(false));
                return resp.json()
            })
            .then((response) => 
                dispatch(
                    daughertyLinksFetchDataSuccess(
                        response.items.sort((a, b) => a.order - b.order)
                        .map(item => new link({...item, tags : ['Daugherty']}))
                    )
                )
            )
            .catch((err) => dispatch(daughertyLinksHaveError(err)));
    };
}