import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import "../CSS/collection.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("userdetails"));
    const userId = userDetails?.user?._id;

    if (!userId) {
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `https://e-book-store-ten.vercel.app/api/v1/order/${userId}`
        );

        const ordersWithImages = await Promise.all(
          data.orders.map(async (order) => {
            const itemsWithImages = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const { data: bookData } = await axios.get(
                    `https://e-book-store-ten.vercel.app/api/v1/user/all-books/${item.bookId}`
                  );
                  return {
                    ...item,
                    imageUrl: `https://e-book-store-ten.vercel.app/api/v1/user/all-books/${item.bookId}`,
                  };
                } catch (error) {
                  console.error("Error fetching book image:", error);
                  return { ...item, imageUrl: null };
                }
              })
            );
            return { ...order, items: itemsWithImages };
          })
        );

        setOrders(ordersWithImages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="loading-text text-center">Loading your orders...</div>
    );
  }

  return (
    <div className="size">
      <div className="collection">
        <h1 className="title">Your Orders</h1>
        <label className="text-4xl">Total Orders: {orders.length}</label>
      </div>

      {orders.length === 0 ? (
        <div className="empty-cart text-center">You have no orders yet.</div>
      ) : (
        <div id="popular-container">
          <div className="featured">
            {orders.map((order) => (
              <div key={order._id} className="container" data-aos="zoom-in-up">
                {/* <h3 className="order-id">Order ID: {order._id}</h3> */}
                {order.items.map((item) => (
                  <div key={item.bookId} className="box">
                    <div className="box-image">
                      <img
                        src={item.imageUrl || "default-image.jpg"}
                        width={150}
                        height={190}
                        alt={item.bookName}
                      />
                      {/* <button className="scart">
                        <DeleteIcon className="cart" />
                      </button> */}
                    </div>
                    <div className="box-text">
                      <h1 className="name">{item.bookName}</h1>
                      <div className="catg">{item.bookGenre}</div>
                      {/* <a
                        href={item.purchaseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn">Purchase Again</button>
                      </a> */}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
