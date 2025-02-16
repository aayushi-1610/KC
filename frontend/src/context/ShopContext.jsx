import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ensuring proper navigation
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    // 🔹 Add item to cart
    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = { ...cartItems };

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        setCartItems(cartData);
    };

    // 🔹 Get total cart count
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                totalCount += cartItems[items][size] || 0;
            }
        }
        return totalCount;
    };

    // 🔹 Update quantity of item in cart
    const updateQuantity = (itemId, size, quantity) => {
        let cartData = { ...cartItems };

        if (quantity === 0) {
            delete cartData[itemId][size];

            if (Object.keys(cartData[itemId] || {}).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId] = {
                ...(cartData[itemId] || {}),
                [size]: quantity,
            };
        }

        setCartItems(cartData);
    };

    // 🔹 Get total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const product = products.find((product) => product._id === itemId);
            if (!product) continue;

            for (const size in cartItems[itemId]) {
                totalAmount += product.price * (cartItems[itemId][size] || 0);
            }
        }
        return totalAmount;
    };

    // 🔹 Log cart updates (for debugging)
    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    // 🔹 Context value
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
