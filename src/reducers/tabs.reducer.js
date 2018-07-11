import * as tabsActions from '../actions/tabs.action'

const defaultState = {
    selectedTab: "Daugherty",
    statusMessage: ""
};

const tabsReducer = (state = defaultState, action) => {
    switch (action.type){
        case tabsActions.TAB_HAS_CHANGED:{
            state = {...state, selectedTab: action.payload}
            break;
        }
        case tabsActions.STATUS_MESSAGE_CHANGED:{
            state = {...state, statusMessage: action.payload}
            break;
        }
        default:{
            return state;
        }
    }
    return state;
}

export default tabsReducer;