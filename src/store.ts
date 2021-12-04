import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchModule from "./modules/searchModule";

const rootReducer = combineReducers({
    search: searchModule.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};