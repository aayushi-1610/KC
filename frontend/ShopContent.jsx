import {createContext, useState} from "react";
import {products} from "../assets/assets";
import {toast} from "react-toastify";

export const ShopCntext = createContext();

const ShopConstProvider = (props) => {
    
    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({}); 
    const navigate = useNavigate();

    const addToCart = async (itemId,size) => {

        if(!size){
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(carrItems);

        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if (cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }

                } catch (error){

                }
            }
        }
        return totalCount;
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])

    const updateQuantity = async (itemId, size, quantity) =>{

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = async () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item]> 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                        
                    }
                    
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const value ={
        products, currency, delivery_fee,
        search,setSearch,shoeSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount,updateQuantity,
        getCartAmount, navigate
    }

    return(
        <ShowContext.Provider value={value}>
            {props.children}
        </ShowContext.Provider>
    )

}

export default ShopContextProvider;