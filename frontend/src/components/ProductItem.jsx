import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image = [], name }) => {
    // Check if image is an array and has at least one element
    const imageUrl = Array.isArray(image) && image.length > 0 ? image[0] : 'default-image-url.jpg';

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
            <img
  className='hover:scale-110 transition ease-in-out h-[50vh]'
  src={image && image.length > 0 ? image[0] : 'default-image-url'} // Provide a default image URL
  alt={name || 'Product Image'} // Use the product name or a default alt text
/>

            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
        </Link>
    );
};

export default ProductItem;
