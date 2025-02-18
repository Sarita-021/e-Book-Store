import React, { useState } from "react";
import { useSelector } from "react-redux";
import { removeFromCart } from "./redux/cartSystem";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "./redux/cartSystem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"; // Add toast for success/failure messages
import "../CSS/collection.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, total, totalItems, status } = useSelector(
    (state) => state.cart
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
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

  // Handle purchase
  const handlePurchase = async (item) => {
    const userDetails = JSON.parse(sessionStorage.getItem("userdetails"));
    const userId = userDetails?.user?._id;

    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/order/create`,
        {
          userId,
          bookId: item.bookId || item._id, // Handle different key names for bookId
          bookName: item.bName,
        }
      );

      if (data.success) {
        setOrderDetails({
          name: item.bName,
          image: `https://e-book-store-ten.vercel.app/api/v1/user/all-books/${
            item.bookId || item._id
          }`,
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
                    src={`https://e-book-store-ten.vercel.app/api/v1/user/all-books/${
                      item.bookId || item._id
                    }`}
                    width={150}
                    height={190}
                    alt={item.bName}
                  />
                  <button
                    className="scart"
                    onClick={() => handleRemove(item.bookId || item._id)}
                  >
                    <DeleteIcon className="cart" />
                  </button>
                </div>
                <div className="box-text">
                  <h1 className="name">{item.bName}</h1>
                  <div className="catg">{item.bGenre}</div>
                  <button className="btn" onClick={() => handlePurchase(item)}>
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
