import {combineReducers, Reducer} from "redux";
import {updateObject} from "../utils";
import {ActionTypes} from "../constants";
import {ContactHolder} from "../declarations";
import {IKeyedPerson, ContactIdsCollection} from "../declarations/state.declaration";

const initialState: ContactHolder = {
    byId: {
        "ce742a2a-4090-46f2-bf4a-51934d0a1199": {
            name: "Jon",
            surname: "Skeet",
            phoneNumber: "111-222-333"
        }
    },
    allIds: [
        "ce742a2a-4090-46f2-bf4a-51934d0a1199"
    ]
};

const contactsByIdReducer: Reducer<IKeyedPerson> = (state = initialState.byId, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CONTACT:
        case ActionTypes.EDIT_CONTACT:
            const person = {
                [action.id]: {
                    name: action.name,
                    surname: action.surname,
                    phoneNumber: action.phoneNumber
                }
            };
            return updateObject(state, person);
        case ActionTypes.REMOVE_CONTACT:
            const clonedState = Object.assign({}, state);
            delete clonedState[action.id];
            return clonedState;
        default:
            return state;
    }
};

const allContactIdsReducer: Reducer<ContactIdsCollection> = (state = initialState.allIds, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CONTACT:
            return [
                ...state,
                action.id
            ];
        case ActionTypes.REMOVE_CONTACT:
            const index = state.indexOf(action.id);
            if (index < 0) {
                return state;
            }

            const left = state.slice(0, index);
            const right = state.slice(index + 1);

            return [ ...left, ...right ];
        default:
            return state;
    }
};

export default combineReducers<ContactHolder>({
    byId: contactsByIdReducer,
    allIds: allContactIdsReducer
});