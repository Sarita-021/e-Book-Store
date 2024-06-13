import React from "react";
import "../images/.."
import "../CSS/book.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from "react-redux";
import { AddCart } from "./redux/cartSystem";
import { useNavigate } from "react-router-dom";


const Book = ({ item }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            {item.map((Val) => {
                return (
                    <div className="container" data-aos="zoom-in-up" ><div key={Val.id}></div>
                        <div className="box-image"  >
                            <img src={Val.image} width={150} height={190} alt="..." />
                            <button className="scart" onClick={() => dispatch(AddCart(Val))}><ShoppingCartIcon className="cart" /></button>
                        </div>
                        <div className="box-text">
                            <h1 className="name" >{Val.name}</h1>
                            <div className="catg">{Val.category}</div>
                            <a href={Val.purchase}><button className="btn">Purchase</button></a>
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default Book;