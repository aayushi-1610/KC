import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/relatedProducts";

const Product = () => {
    const { productId } = useParams();
    const { products, addToCart, token, navigate } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const [isZoomed, setIsZoomed] = useState(false);
    const imageRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find((item) => item._id === productId);
            if (foundProduct) {
                setProductData(foundProduct);
                setImage(foundProduct.images?.[0] || "https://via.placeholder.com/400");
            }
        }
    }, [productId, products]);

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setMousePosition({ x, y });
    };

    const handleAddToCart = () => {
        if (!token) {
            toast.error("Please login to add items to the cart");
            navigate('/login');
            return;
        }
        addToCart(productData._id);
    };

    if (!productData) {
        return <p>Loading product...</p>;
    }

    return (
        <div className="border-t-2 pt-10">
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
                        {productData.image?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt=""
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                onClick={() => setImage(img)}
                            />
                        ))}
                    </div>
                    <div 
                        className="w-full sm:w-[80%] relative overflow-hidden"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <img 
                            ref={imageRef}
                            src={image} 
                            alt="Product" 
                            className="w-full h-auto"
                        />
                        {isZoomed && (
                            <div 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                                    backgroundSize: '200%',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
                    <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
                    
                    <div className="flex flex-col gap-4 my-8">
                        <div className="flex gap-4">
                            {productData.sizes?.map((item, index) => (
                                <button
                                    key={index}
                                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                                    onClick={() => setSize(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={handleAddToCart} 
                        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                    >
                        ADD TO CART
                    </button>

                    <hr className="mt-8 sm:w-4/5" />
                </div>
            </div>

            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    );
};

export default Product;