import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Wishlist = () => {
    const { wishlistItems, products, addToWishlist } = useContext(ShopContext);

    return (
        <div>
            <h1 className="text-2xl">My Wishlist</h1>
            <div className="grid grid-cols-3 gap-4">
                {products.filter(item => wishlistItems[item._id]).map(product => (
                    <div key={product._id} className="border p-4">
                        <img src={product.image[0]} alt={product.name} className="w-full" />
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                        <button 
                            className="bg-red-500 text-white px-4 py-2"
                            onClick={() => addToWishlist(product._id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
