import { createSlice, configureStore } from "@reduxjs/toolkit";
import { cartSystem } from "./cartSystem";
import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";

import cartReducer from "./cartSystem"

const rootReducer = combineReducers({
    cart: cartReducer,
    theme: themeReducer,
})

export default rootReducer
