import {Reducer} from "redux";
import {updateObject} from "../utils";
import {ActionTypes} from "../constants";
import {IKeyedPerson, ContactIdsCollection} from "../declarations/state.declaration";

const initialState = {
    byId: {},
    allIds: []
};

const contactsByIdReducer: Reducer<IKeyedPerson> = (state = {}, action) => {
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

const allContactIdsReducer: Reducer<ContactIdsCollection> = (state = [], action) => {
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

const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.POPULATE_CONTACTS:
            const obj = {
                byId: {},
                allIds: []
            };

            for (let contact of action.data) {
                obj.byId[contact.id] = {
                    name: contact.name,
                    surname: contact.surname,
                    phoneNumber: contact.phoneNumber
                };
                obj.allIds.push(contact.id);
            }
            // Map data from service to state
            return obj;
        default:
            return {
                byId: contactsByIdReducer(state.byId, action),
                allIds: allContactIdsReducer(state.allIds, action)
            }
    }
};


export default peopleReducer;
