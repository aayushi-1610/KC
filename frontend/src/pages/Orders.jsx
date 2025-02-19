import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const {backendUrl,token, products, currency } = useContext(ShopContext);

  const [orderData,setorderData]=useState([])

  const loadOrderData=async () =>{
    try{
      if(!token){
        return null;
      }
      const response=await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
      if(response.data.success)
      {
        let allOrdersItem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['date']=order.date
            allOrdersItem.push(item)
          })
        })
        console.log(allOrdersItem);
      }
    }
    catch(error)
    {

    }
  }


  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {products?.length > 0 ? (
          products.slice(1, 4).map((item, index) => (
            <div 
              key={item?._id || index} 
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              {/* Product Details */}
              <div className='flex items-start gap-6 text-sm'>
                <img 
                  className='w-16 sm:w-20' 
                  src={item?.images?.[0] || 'https://via.placeholder.com/150'} 
                  alt={item?.name || "Product Image"} 
                />
                <div>
                  <p className='sm:text-base font-medium'>{item?.name || "Unknown Product"}</p>
                  
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                </div>
              </div>

              {/* Order Status & Tracking */}
              <div>
                <div>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                 <p className='text-sm md:text-base'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>

                </div>


            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
