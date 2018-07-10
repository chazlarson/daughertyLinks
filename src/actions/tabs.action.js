
export const TAB_HAS_CHANGED = "TAB_HAS_CHANGED";

export function updateSelectedTab(newTab){
    return dispatch => {
        dispatch({
            type: TAB_HAS_CHANGED,
            payload: newTab
        })
    } 
}