import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl1, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(backendUrl1 + '/api/order/userorders', {}, {
        headers: { token }
      });

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 bg-gray-50 min-h-screen px-4">
      {/* Title */}
      <div className="text-3xl text-indigo-600 mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Order list */}
      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            {/* Item details */}
            <div className="flex items-start gap-4">
              <img className="w-20 h-20 object-cover rounded-md" src={item.image[0]} alt={item.name} />
              <div className="text-sm text-gray-800">
                <p className="text-base font-semibold">{item.name}</p>
                <div className="flex gap-4 mt-1 text-gray-600 text-sm">
                  <p>{currency}{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1 text-gray-500">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                <p className="mt-1 text-gray-500">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
              </div>
            </div>

            {/* Status and action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 w-full sm:w-1/2">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  item.status === "Delivered" ? "bg-green-500" :
                  item.status === "Pending" ? "bg-yellow-400" :
                  "bg-gray-400"
                }`}></span>
                <p className="text-sm sm:text-base text-gray-700">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-md hover:bg-indigo-700 transition"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
