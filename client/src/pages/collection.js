import React from "react";
import { useSelector } from 'react-redux';
import { removeFromCart } from "./redux/cartSystem";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "./redux/cartSystem";
import "../CSS/collection.css";

const Cart = (item) => {
    const dispatch = useDispatch();
    const { cart, total, totalItems, status } = useSelector((state) => state.cart);
    console.log(cart);
    const user = JSON.parse(sessionStorage.getItem("userdetails"));
    const userId = user?.user?._id; // Extract user ID

    // Fetch cart data when the component mounts
    useEffect(() => {
        dispatch(fetchCart(userId));
    }, [dispatch, userId]);

    // Handle remove from cart
    const handleRemove = (bookId) => {
        dispatch(removeFromCart({ userId, bookId }));
    };

    return (
        <div className="size">
            <div className="collection">
                <h1 className="title">Your Collection</h1>
                <label className="text-4xl">Total Items: {totalItems}</label>
            </div>

            {status === "loading" ? (
                <div className="loading-text text-center">Loading your cart...</div>
            ) : cart.length === 0 ? (
                <div className="empty-cart text-center">Your cart is empty.</div>
            ) : (
                <div id="popular-container">
                    <div className="featured">
                        {cart.map((item) => (
                            <div key={item._id} className="container" data-aos="zoom-in-up">
                                <div className="box-image">
                                    <img
                                        src={`https://e-book-store-ten.vercel.app/api/v1/user/all-books/${item.bookId?item.bookId:item._id}`}
                                        width={150}
                                        height={190}
                                        alt={item.bName}
                                    />
                                    <button className="scart" onClick={() => handleRemove(item.bookId)}>
                                        <DeleteIcon className="cart" />
                                    </button>
                                </div>
                                <div className="box-text">
                                    <h1 className="name">{item.bName}</h1>
                                    <div className="catg">{item.bGenre}</div>
                                    <a href={item.pLink} target="_blank" rel="noopener noreferrer">
                                        <button className="btn">Purchase</button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart;