import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl1, currency } from '../App';
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl1 + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl1 + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Orders</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start bg-white border border-gray-200 shadow-sm p-5 rounded-lg text-sm text-gray-700"
          >
            <img className="w-12 h-12" src={assets.parcel_icon} alt="Parcel Icon" />

            {/* Order Details */}
            <div className="space-y-1">
              <div className="text-gray-800 font-medium">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.name} ×{item.quantity} <span className="text-gray-500 text-xs">({item.size})</span>
                  </p>
                ))}
              </div>
              <p className="pt-2 font-semibold text-indigo-700">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="text-gray-600">
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              </div>
              <p className="text-gray-500 text-sm">📞 {order.address.phone}</p>
            </div>

            {/* Summary Info */}
            <div className="space-y-1">
              <p>🧾 Items: {order.items.length}</p>
              <p>💳 Method: {order.paymentMethod}</p>
              <p>💰 Payment: <span className={order.payment ? "text-green-600" : "text-red-600"}>{order.payment ? "Done" : "Pending"}</span></p>
              <p>📅 Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className="font-bold text-indigo-600 self-center">{currency}{order.amount}</p>

            {/* Status Dropdown */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 bg-indigo-50 text-indigo-800 font-semibold rounded border border-indigo-300 outline-none"
            >
              <option value="Order Place">Order Place</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
