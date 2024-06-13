import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart: [],
    quantity: 0
}

const CartSystem = createSlice({
    name: "user",
    initialState,
    reducers: {
        AddCart: (state, action) => {
            const find = state.cart.findIndex(item => item.id === action.payload.id)
            if (find >= 0) {
                state.cart[find].quantity += 1
            } else {
                const tempvar = { ...action.payload, quantity: 1 }
                state.cart.push(tempvar)
            }
        },

        RemoveFromCart: (state, action) => {
            const nextCartItems = state.cart.filter(
                cart => cart.id !== action.payload.id
            )
            state.cart = nextCartItems;
        }

    }
}
)

export const { AddCart, RemoveFromCart } = CartSystem.actions;
export default CartSystem.reducer;