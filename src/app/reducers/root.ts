import {combineReducers, Reducer} from "redux";
import people from "./people";
import {IAppState} from "../declarations";

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
    people: people
});