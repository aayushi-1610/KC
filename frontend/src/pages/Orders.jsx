import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  // Function to load orders from the backend
  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Function to generate and download the invoice PDF for a given order
  const generateInvoice = (order) => {
    const doc = new jsPDF();

    // Invoice Title
    doc.setFontSize(18);
    doc.text('Invoice', 14, 22);

    // Order Information
    doc.setFontSize(12);
    doc.text(`Order Date: ${new Date(order.date).toLocaleDateString()}`, 14, 32);
    doc.text(`Status: ${order.status}`, 14, 40);

    // Customer Information (if available)
    if (order.address) {
      const { firstName, lastName, email, street, city, state, zipcode, country, phone } = order.address;
      doc.text(`Customer: ${firstName} ${lastName}`, 14, 50);
      doc.text(`Email: ${email}`, 14, 58);
      doc.text(`Address: ${street}, ${city}, ${state}, ${zipcode}, ${country}`, 14, 66);
      doc.text(`Phone: ${phone}`, 14, 74);
    }

    // Items Header
    doc.text('Items:', 14, 84);
    let yPosition = 92;
    order.items.forEach((item, index) => {
      const itemText = `${index + 1}. ${item.name} `;
      doc.text(itemText, 14, yPosition);
      yPosition += 8;
    });

    // Automatically download the invoice with a filename that includes the order ID
    doc.save(`invoice_${order._id}.pdf`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="border-t pt-16">
        <div className="text-2xl mb-8">
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>

        <div className="space-y-8">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div 
                key={order._id} 
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* Order Details */}
                <div className="flex flex-col gap-2 text-sm">
                  <p className="sm:text-base font-medium">Order ID: {order._id}</p>
                  <p>
                    Date: <span className="text-gray-400">{new Date(order.date).toDateString()}</span>
                  </p>
                  <p>
                    Status: <span className="text-gray-400">{order.status}</span>
                  </p>
                  <div>
                    <p className="font-medium">Items:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img 
                            src={item.images?.[0] || 'https://via.placeholder.com/40'} 
                            alt={item.name || "Product Image"}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <p className="text-gray-600 text-xs">
                            {item.name} 
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Download Invoice Button */}
                <div>
                  <button 
                    onClick={() => generateInvoice(order)} 
                    className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-200 transition"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
