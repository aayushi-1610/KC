import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Set initial token from sessionStorage (not persistent across page reloads)
    const [token, setToken] = useState(sessionStorage.getItem('token') || '');
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cartItems")) || {};
    });
    const [products, setProducts] = useState([]);

    // 🔹 Add item to cart
    const addToCart = async (itemId) => {
        let cartData = { ...cartItems };
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);
    
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message || "Failed to add to cart");
            }
        }
    };

    // 🔹 Get total cart count
    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
    };

    // 🔹 Update quantity of item in cart
    const updateQuantity = (itemId, quantity) => {
        let cartData = { ...cartItems };

        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        setCartItems(cartData);
    };

    // 🔹 Get total cart amount
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((totalAmount, [itemId, qty]) => {
            const product = products.find((product) => product._id === itemId);
            if (!product) return totalAmount;
            return totalAmount + product.price * qty;
        }, 0);
    };

    // 🔹 Fetch Products Data
    const getProductsData = async () => {
        try {
            if (!backendUrl) {
                toast.error("Backend URL is not set");
                return;
            }
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
                console.log(response.data.products);

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Error fetching products");
        }
    };

    // 🔹 Persist Cart Data in Local Storage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // 🔹 Persist Token in sessionStorage
    useEffect(() => {
        if (token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    // 🔹 Fetch Products on Mount
    useEffect(() => {
        getProductsData();
    }, []);

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
        backendUrl,
        setToken,
        token
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
