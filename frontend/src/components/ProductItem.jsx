import React from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ id, name, image }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!id) {
            console.error("Product ID is missing!");
            return;
        }
        navigate(`/product/${id}`);
    };

    return (
        <div 
            className="group border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer bg-white w-[12rem] h-[14rem]"
            onClick={handleClick}
            aria-label={`View details for ${name}`}
        >
            {/* Image Container with Fixed Aspect Ratio */}
            <div className="w-full h-[10rem] overflow-hidden">
                <img 
                    src={image || "https://via.placeholder.com/400?text=No+Image"} 
                    alt={name || "Product image"} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Product Name */}
            <div className="p-2 text-center">
                <p className="text-sm font-medium truncate max-w-full">{name || "Unnamed Product"}</p>
            </div>
        </div>
    );
};

export default ProductItem;
