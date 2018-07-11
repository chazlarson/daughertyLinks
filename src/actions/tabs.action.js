
export const TAB_HAS_CHANGED = "TAB_HAS_CHANGED";
export const STATUS_MESSAGE_CHANGED = "STATUS_MESSAGE_CHANGED";

export function updateSelectedTab(newTab){
    return dispatch => {
        dispatch({
            type: TAB_HAS_CHANGED,
            payload: newTab
        })
    } 
}

export function updateStatusMessage(msg){
    return dispatch => {
        dispatch({
            type: STATUS_MESSAGE_CHANGED,
            payload: msg
        })
    } 
}