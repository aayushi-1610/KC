import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import assets from "../assets/assets.js";

const Cart = () => {
    const {
        products, currency, cartItems, setCartItems,
        delivery_fee, token, getCartData, navigate,removeFromCart
    } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);

    // 🔹 Redirect to login if not authenticated
    useEffect(() => {
        if (!token) {
            toast.error("Please log in to view your cart.");
            navigate("/login");
            return;
        }
        getCartData();
    }, [token, navigate, getCartData]);

    // 🔹 Convert cartItems into an array for rendering
    useEffect(() => {
        const tempData = [];
        Object.entries(cartItems).forEach(([productId, sizes]) => {
            Object.entries(sizes).forEach(([size, quantity]) => {
                if (quantity > 0) {
                    tempData.push({ productId, size, quantity });
                }
            });
        });
        setCartData(tempData);
    }, [cartItems]);

    // 🔹 Find product details from `products` array
    const getProductDetails = (productId) => {
        return products.find((product) => product._id === productId);
    };

    // 🔹 Remove item from cart

    // 🔹 Calculate total cart amount
    const getCartAmount = () => {
        return cartData.reduce((total, item) => {
            const product = getProductDetails(item.productId);
            return product ? total + product.price * item.quantity : total;
        }, 0);
    };

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3 font-semibold text-gray-800">YOUR CART</div>

            {cartData.length === 0 ? (
                <p className="text-center text-gray-500 my-10">Your cart is empty!</p>
            ) : (
                <>
                    <div>
                        {cartData.map((item, index) => {
                            const productData = getProductDetails(item.productId);
                            if (!productData) return null;

                            return (
                                <div
                                    key={index}
                                    className="py-4 border-t border-b text-gray-700 flex items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-6">
                                        {productData.images?.[0] && (
                                            <img
                                                className="w-16 sm:w-20"
                                                src={productData.images[0]}
                                                alt={productData.name}
                                            />
                                        )}
                                        <div>
                                            <p className="text-sm sm:text-lg font-medium">
                                                {productData.name} - {item.size.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            className="border max-w-12 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            readOnly
                                        />
                                        <img
                                            className="w-5 cursor-pointer"
                                            src={assets.assets.bin_icon}
                                            alt="Remove"
                                            onClick={() => removeFromCart(item.productId)}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Cart Totals */}
                    <div className="flex justify-end my-10">
                        <div className="w-full sm:w-[400px] bg-gray-100 p-4 rounded-md">
                            <hr className="my-2" />
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
