import axios from 'axios';
import { backendUrl1, currency } from '../App';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl1 + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl1 + '/api/product/remove/',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>All Products</h2>
      <div className='flex flex-col gap-2'>

        {/* Header Row */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-indigo-100 text-indigo-800 font-semibold text-sm rounded-md shadow-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-4 bg-white text-gray-700 text-sm border rounded-md hover:shadow-md transition-shadow duration-200'
          >
            <img className='w-12 h-12 object-cover rounded-md border' src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p className='font-medium text-gray-900'>{currency}{item.price}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className='text-center text-red-600 font-bold cursor-pointer hover:text-red-800 transition-colors duration-200'
            >
              ×
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
