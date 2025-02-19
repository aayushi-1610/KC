import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';
const Orders = ({token}) => {  // ✅ Takes adminAuth as a prop
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
        toast.error("Admin authentication required! Please login.");
        return;
    }

    console.log("Admin Token being sent:", token);

    try {
        const response = await axios.get(`${backendUrl}/api/order/list`, {
            headers: {
                Authorization: `Bearer ${token}`, // ✅ Correct format
            },
        });

        if (response.data.success) {
            setOrders(response.data.orders);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);

        if (error.response?.status === 401) {
            toast.error("Not authorized! Please login as an admin.");
        } else {
            toast.error("Failed to fetch orders");
        }
    }
};


  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-card">
                <br></br>
                <hr></hr>
                <br></br>
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx}>{item.name}</p>
                ))}
              </div>
              <p>{order.address.firstName} {order.address.lastName}</p>
              <div>
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
