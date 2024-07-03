import React from "react";
import "../images/.."
import "../CSS/book.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSystem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Book = ({ item }) => {

    const dispatch = useDispatch();
    // const handleCart = async (Val) => {

    //     if (localStorage.getItem('islogin')) {    //matching password and confirm password

    const handleAddToCart = (Val) => {
        if (localStorage.getItem('islogin')) {
            console.log("dispatching add to cart")
            dispatch(addToCart(Val));
            return;
        } else {
            toast.error("User not logged in")
        }
    }

    return (
        <>
            {item.map((Val) => {
                return (
                    <div className="container" data-aos="zoom-in-up" ><div key={Val.id}></div>
                        <div className="box-image"  >
                            <img src={'https://e-book-store-ten.vercel.app/api/v1/user/all-books/' + Val._id} width={150} height={190} alt="..." />
                            <button className="scart" onClick={() => handleAddToCart(Val)}><ShoppingCartIcon className="cart" /></button>
                        </div>
                        <div className="box-text">
                            <h1 className="name" >{Val.metadata.bName}</h1>
                            <div className="catg">{Val.metadata.bGenre}</div>
                            <a href={Val.metadata.pLink}><button className="btn">Purchase</button></a>
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default Book;