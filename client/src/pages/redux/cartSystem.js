import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
// const initialState = {
//     cart: [],
//     quantity: 0
// }
const initialState = {
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
    totalItems: localStorage.getItem("totalItems")
        ? JSON.parse(localStorage.getItem("totalItems"))
        : 0,
}

const CartSystem = createSlice({
    name: "user",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            console.log(action.payload)
            state.cart.push(item)
            state.totalItems++
            state.total += item.price
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            toast.success("Item added to cart")
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload
            const index = state.cart.findIndex((item) => item._id === itemId)

            if (index >= 0) {

                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                toast.success("Item removed from cart")
            }
        },

    }
}
)


export const { addToCart, resetCart, removeFromCart } = CartSystem.actions;
export default CartSystem.reducer;