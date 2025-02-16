import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useEffect } from 'react'
import ProductItem from './ProductItem'
const LatestCollection = () => {

    const { products }=useContext(ShopContext);
    const [latestProducts,SetLatestProducts]=useState([]);

    useEffect(()=>{
        SetLatestProducts(products.slice(0,10));
    },[])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST '} text2={'COLLECTIONS'}></Title>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover our latest saree collection—where tradition meets elegance! From luxurious silk & Banarasi sarees to trendy georgette & designer drapes, we have the perfect saree for every occasion.
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}></ProductItem>
            ))
        }
        </div>
    </div>
  )
}

export default LatestCollection