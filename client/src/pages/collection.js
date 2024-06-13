import React from "react";
import { useSelector } from 'react-redux';
import { RemoveFromCart } from "./redux/cartSystem";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import "../CSS/collection.css";

const Cart = () => {
    const { cart } = useSelector((item) => item.user)

    const dispatch = useDispatch();

    return (
        <div className="size">
            <div className="collection">
                <h1 className="title">Your Collection</h1>
                <label htmlFor="" className="text-4xl" > Total Item : {cart.length} </label>
            </div>
            <div id="popular-container">
                <div className="featured">
                    {cart.map((item) => {
                        return (
                            <div className="container" data-aos="zoom-in-up" ><div key={item.id}></div>
                                <div class="box-image">
                                    <img src={item.image} width={150} height={190} alt="..." />
                                    <button className="scart" onClick={() => dispatch(RemoveFromCart(item))}><DeleteIcon className="cart" /></button>
                                </div>
                                <div class="box-text">
                                    <h1 className="name">{item.name}</h1>
                                    <div className="catg">{item.category}</div>
                                    <a href={item.purchase}><button class="btn">Purchase</button></a>
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