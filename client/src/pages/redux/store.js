import { createSlice, configureStore } from "@reduxjs/toolkit";
import { cartSystem } from "./cartSystem";
import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./cartSystem"

const rootReducer = combineReducers({
    cart: cartReducer,
})

export default rootReducer
