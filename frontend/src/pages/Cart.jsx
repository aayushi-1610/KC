import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { ShopContext } from "../context/ShopContext"; 
import { toast } from "react-toastify"; // Optional for notifications
import assets from "../assets/assets.js";

const Cart = () => {
    const {
        products, currency, cartItems = {}, 
        updateQuantity, addToCart, delivery_fee
    } = useContext(ShopContext);
    
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    // 🔹 Sync cart state with display data
    useEffect(() => {
        const tempData = [];
        Object.entries(cartItems).forEach(([productId, sizes]) => {
            Object.entries(sizes).forEach(([size, quantity]) => {
                if (quantity > 0) {
                    tempData.push({ _id: productId, size, quantity });
                }
            });
        });
        setCartData(tempData);
    }, [cartItems]);

    // 🔹 Calculate total cart amount
    const getCartAmount = () => {
        return cartData.reduce((total, item) => {
            const product = products.find((p) => p._id === item._id);
            return product ? total + product.price * item.quantity : total;
        }, 0);
    };

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3 font-semibold text-gray-800">
                YOUR CART
            </div>

            {cartData.length === 0 ? (
                <p className="text-center text-gray-500 my-10">Your cart is empty!</p>
            ) : (
                <>
                    <div>
                        {cartData.map((item, index) => {
                            const productData = products.find((product) => product._id === item._id);
                            if (!productData) return null;

                            return (
                                <div
                                    key={index}
                                    className="py-4 border-t border-b text-gray-700 flex items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-6">
                                        {productData.image?.[0] && (
                                            <img
                                                className="w-16 sm:w-20"
                                                src={productData.image[0]}
                                                alt={productData.name}
                                            />
                                        )}
                                        <div>
                                            <p className="text-sm sm:text-lg font-medium">
                                                {productData.name}
                                            </p>
                                            <div className="flex items-center gap-5 mt-2">
                                                <p>{currency}{productData.price.toFixed(2)}</p>
                                                <p className="px-2 sm:px-3 sm:py-1 border bg-gray-100">
                                                    {item.size}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            onChange={(e) => {
                                                let value = Number(e.target.value);
                                                if (value < 1 || isNaN(value)) return;
                                                updateQuantity(item._id, item.size, value);
                                            }}
                                            className="border max-w-12 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                                            type="number"
                                            min={1}
                                            defaultValue={item.quantity}
                                        />
                                        <img
                                            onClick={() => updateQuantity(item._id, item.size, 0)}
                                            className="w-5 cursor-pointer"
                                            src={assets.bin_icon}
                                            alt="Remove"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Cart Totals */}
                    <div className="flex justify-end my-10">
                        <div className="w-full sm:w-[400px] bg-gray-100 p-4 rounded-md">
                            <p className="text-lg font-semibold">Cart Totals</p>
                            <div className="flex justify-between mt-2">
                                <p>Subtotal:</p>
                                <p>{currency}{getCartAmount().toFixed(2)}</p>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between">
                                <p>Shipping Fee:</p>
                                <p>{currency}{delivery_fee.toFixed(2)}</p>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-bold">
                                <p>Total:</p>
                                <p>{currency}{getCartAmount() + delivery_fee}</p>
                            </div>
                            <button
                                onClick={() => navigate("/place-order")}
                                className="bg-black text-white text-sm mt-6 px-6 py-2 w-full"
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
