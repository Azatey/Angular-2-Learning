import {Reducer} from "redux";
import {ActionTypes} from "../constants";

const fetchingReducer: Reducer<boolean> = (state = false, action) => {
    return action.type === ActionTypes.FETCH_CONTACTS;
};

 const loadStatusReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CONTACTS:
            return fetchingReducer(state, action);
        case ActionTypes.POPULATE_CONTACTS:
        default:
            return false;
    }
};

export default loadStatusReducer;