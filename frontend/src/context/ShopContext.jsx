import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';
import { useCallback } from "react";


export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState(sessionStorage.getItem('token') || '');
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);




    

// Wrap getCartData inside useCallback
const getCartData = useCallback(async () => {
    if (!token) return;
    try {
        const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
        if (response.data.success) {
            setCartItems(response.data.cartData);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Failed to fetch cart data.");
    }
}, [token, backendUrl]);

// Now useEffect won't re-run infinitely
useEffect(() => {
    getCartData();
}, [getCartData]);


    const addToCart = async (itemId, size) => {
        if (!token) {
            toast.error("Please login to add items to the cart");
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
            if (response.data.success) {
                getCartData();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add to cart");
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        try {
            await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            getCartData();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update quantity.");
        }
    };

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((totalAmount, [itemId, sizes]) => {
            const product = products.find((product) => product._id === itemId);
            if (!product) return totalAmount;
            return totalAmount + Object.values(sizes).reduce((sum, qty) => sum + product.price * qty, 0);
        }, 0);
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching products");
        }
    };
      // 🔹 Function to calculate cart count
      const getCartCount = () => {
        return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
    };

    // 🔹 Fetch User Cart from Database
    const fetchUserCart = async () => {
        if (!token) return;
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
                console.log(response.data.cartData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching cart data");
        }
    };

    // 🔹 Fetch user cart when token changes
    useEffect(() => {
        if (token) {
            fetchUserCart();
        }
    }, [token]);

    // 🔹 Save cart data in local storage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (token) {
            getCartData();
        }
    }, [token]);

    useEffect(() => {
        getProductsData();
    }, []);

    const logout = () => {
        setToken('');
        setCartItems({});
        sessionStorage.removeItem('token');
        navigate('/login');
    };

// 🔹 Remove item from cart
const removeFromCart = async (itemId, size) => {
    let cartData = { ...cartItems };

    if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size]; // Remove only the specific size

        // Remove product entry if no sizes left
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }

        setCartItems(cartData); // Update state
    }

    if (token) {
        try {
            await axios.post(`${backendUrl}/api/cart/remove`, { itemId, size }, { headers: { token } });
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to remove from cart");
        }
    }
};

 


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
        updateQuantity,
        getCartAmount,
        getCartData,
        navigate,
        backendUrl,
        setToken,
        token,
        removeFromCart,  // 🔹 Add this here
        logout
        ,
        
        setCartItems,
        getCartCount,
        fetchUserCart
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
