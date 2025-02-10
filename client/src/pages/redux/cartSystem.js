import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Fetch user's cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
    const res = await fetch(`https://e-book-store-ten.vercel.app/api/v1/cart/${userId}`);
    return res.json();
});

// Add book to cart (Backend API)
export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, book }) => {
    const res = await fetch("https://e-book-store-ten.vercel.app/api/v1/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookId: book._id }),
    });

    const data = await res.json();
    if (res.ok) toast.success("Item added to cart");
    return data.cart;
});

// Remove book from cart (Backend API)
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ userId, bookId }) => {
    const res = await fetch("https://e-book-store-ten.vercel.app/api/v1/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookId }),
    });

    const data = await res.json();
    if (res.ok) toast.success("Item removed from cart");
    return data.cart;
});

// Initial state (Uses localStorage for fast UI updates)
const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    status: "idle", // loading, success, error
};

const CartSystem = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Local add (for UI responsiveness before backend call)
        addToCartLocal: (state, action) => {
            const item = action.payload;
            state.cart.push(item);
            state.totalItems++;
            state.total += item.price;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        },

        // Local remove (for UI responsiveness before backend call)
        removeFromCartLocal: (state, action) => {
            const bookId = action.payload;
            const index = state.cart.findIndex((item) => item._id === bookId);

            if (index >= 0) {
                state.totalItems--;
                state.total -= state.cart[index].price;
                state.cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            }
        },

        // Reset cart locally
        resetCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload.items || [];
                state.totalItems = state.cart.length;
                state.total = state.cart.reduce((sum, item) => sum + (item.price || 0), 0);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                state.status = "success";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload.items || [];
                state.totalItems = state.cart.length;
                state.total = state.cart.reduce((sum, item) => sum + (item.price || 0), 0);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload.items || [];
                state.totalItems = state.cart.length;
                state.total = state.cart.reduce((sum, item) => sum + (item.price || 0), 0);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            });
    },
});

export const { addToCartLocal, removeFromCartLocal, resetCart } = CartSystem.actions;
export default CartSystem.reducer;
