import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className="my-10 px-6">
            {/* Section Title */}
            <div className="text-center text-3xl py-8">
                <Title text1="BEST" text2="SELLERS" />
                <p className="w-full max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
                    Elevate your style with our most-loved sarees! From the rich elegance of Banarasi silk to the effortless charm of georgette and chiffon drapes, our bestseller collection blends tradition with modern grace. Whether it's a grand celebration or an everyday statement, these sarees are timeless favorites. Shop now and embrace elegance!
                </p>
            </div>

            {/* Product Grid - Adjusted for Better Image Accommodation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {bestSeller.map((item) => (
                    <ProductItem 
                        key={item._id} 
                        id={item._id} 
                        name={item.name} 
                        image={Array.isArray(item.images) ? item.images[0] : item.images} 
                    />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
