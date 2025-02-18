import React from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ id, name, image }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`); // Ensure this matches your route
    };

    return (
        <div className="border p-4 text-center cursor-pointer" onClick={handleClick}>

            <img src={image || "https://via.placeholder.com/400"} alt={name} className="w-full h-48 object-cover" />
            <p className="mt-2 text-lg">{name}</p>
        </div>
    );
};

export default ProductItem;
