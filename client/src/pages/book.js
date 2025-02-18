import React, { useState } from "react";
import "../images/..";
import "../CSS/book.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSystem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Book = ({ item }) => {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const navigate = useNavigate();

  const handleAddToCart = async (Val) => {
    const userDetails = JSON.parse(sessionStorage.getItem("userdetails"));
    const userId = userDetails?.user?._id;

    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      const { data } = await axios.post(
        `https://e-book-store-ten.vercel.app/api/v1/cart/add`,
        {
          userId,
          bookId: Val._id,
          bookName: Val.metadata.bName,
          bookGenre: Val.metadata.bGenre,
          purchaseLink: Val.metadata.pLink,
        }
      );

      if (data.success) {
        dispatch(addToCart(Val));
        toast.success("Book added to cart!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book to cart.");
    }
  };

  const handlePurchase = async (Val) => {
    const userDetails = JSON.parse(sessionStorage.getItem("userdetails"));
    const userId = userDetails?.user?._id;

    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      const { data } = await axios.post(
        `https://e-book-store-ten.vercel.app/api/v1/order/create`,
        {
          userId,
          bookId: Val._id,
          bookName: Val.metadata.bName,
        }
      );

      if (data.success) {
        setOrderDetails({
          name: Val.metadata.bName,
          price: Val.metadata.price,
          image: `https://e-book-store-ten.vercel.app/api/v1/user/all-books/${Val._id}`,
          deliveryTime: "2-3 days",
        });
        toast.success("Order placed successfully!");
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <>
      {item.map((Val) => {
        return (
          <div className="container" data-aos="zoom-in-up" key={Val._id}>
            <div className="box-image">
              <img
                src={`https://e-book-store-ten.vercel.app/api/v1/user/all-books/${Val._id}`}
                width={150}
                height={190}
                alt={Val.metadata.bName}
              />
              <button className="scart" onClick={() => handleAddToCart(Val)}>
                <ShoppingCartIcon className="cart" />
              </button>
            </div>
            <div className="box-text">
              <h1 className="name">{Val.metadata.bName}</h1>
              <div className="catg">{Val.metadata.bGenre}</div>
              <button className="btn" onClick={() => handlePurchase(Val)}>
                Purchase
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Book;
