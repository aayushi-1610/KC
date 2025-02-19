import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { backendUrl, token, cartItems, setCartItems, products } = useContext(ShopContext);
  const navigate = useNavigate(); // Use navigate properly
  const invoiceRef = useRef(); // Reference for capturing the invoice

  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        paymentMethod: method,
      };

      const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
        headers: { token },
      });

      console.log(response);
      if (response.data.success) {
        setCartItems({});
        toast.success('Order placed successfully!');
        navigate('/orders');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong while placing the order.');
    }
  };

  const generatePDF = () => {
    const input = invoiceRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
      pdf.save('invoice.pdf');
    });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="Delivery" text2="Information" />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Id"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Address"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone Number"
        />
      </div>

      {/* Right Side - Order Summary & Payment */}
      <div className="mt-8 min-w-80">
        <div className="mt-12">
          {/* Invoice Section */}
          <div className="mt-8 p-4 border border-gray-300 rounded bg-gray-50" ref={invoiceRef}>
            <h2 className="text-lg font-bold">Invoice</h2>
            <p>
              <strong>Customer:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Order Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="mt-3">
              Thank you for shopping with <strong>Kashvi Creation</strong>!
            </p>
          </div>

          {/* Buttons */}
          <div className="w-full text-end mt-8 flex flex-col gap-3">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
            <button type="button" onClick={generatePDF} className="bg-blue-600 text-white px-16 py-3 text-sm">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
