import React from "react";
import { useSelector } from 'react-redux';
import { removeFromCart } from "./redux/cartSystem";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import "../CSS/collection.css";

const Cart = (item) => {
    const { cart } = useSelector((state) => state.cart);
    const { total, totalItems } = useSelector((state) => state.cart)

    const dispatch = useDispatch();

    return (
        <div className="size">
            <div className="collection">
                <h1 className="title">Your Collection</h1>
                <label htmlFor="" className="text-4xl" > Total Item : {totalItems} </label>
            </div>
            <div id="popular-container">
                <div className="featured">
                    {cart.map((item) => {
                        return (
                            <div className="container" data-aos="zoom-in-up" ><div key={item.id}></div>
                                <div class="box-image">
                                    <img src={'http://localhost:8080/api/v1/user/all-books/' + item._id} width={150} height={190} alt="..." />
                                    <button className="scart" onClick={() => dispatch(removeFromCart(item._id))}><DeleteIcon className="cart" /></button>
                                </div>
                                <div class="box-text">
                                    <h1 className="name">{item.metadata.bName}</h1>
                                    <div className="catg">{item.metadata.bGenre}</div>
                                    <a href={item.metadata.pLink}><button class="btn">Purchase</button></a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Cart;