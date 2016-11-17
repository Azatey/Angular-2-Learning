import {combineReducers, Reducer} from "redux";
import peopleReducer from "./people.reducer";
import loadStatusReducer from "./data.reducer";
import {IAppState} from "../declarations";

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
    people: peopleReducer,
    isLoading: loadStatusReducer
});