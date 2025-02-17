import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("Fetched Products:", response.data); // Debugging response

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

const removeProduct = async(id) =>{
  try {
    
const response = await axios.post(backendUrl+'/api/product/remove',{id},{headers:{token}})

if(response.data.success){
  toast.success(response.data.message)
  await fetchList();
}
else
{
  toast.error(response.data.message)
}

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">

        {/* ------- List Table Header -------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------- Product List -------- */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
              <img src={item.images?.[0] || "fallback.jpg"} alt="Product" className="w-16 h-16 object-cover" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
            </div>
          ))
        ) : (
          <p  className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </>
  );
};

export default List;
