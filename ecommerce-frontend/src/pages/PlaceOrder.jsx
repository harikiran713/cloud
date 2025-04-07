import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl1,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const response = await axios.post(
        backendUrl1 + "/api/order/place",
        orderData,
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-10 pt-10 sm:pt-16 min-h-[80vh] border-t bg-gradient-to-br from-white to-gray-50 px-4 sm:px-12"
    >
      <div className="flex flex-col gap-5 w-full sm:max-w-[480px] bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="text-xl sm:text-2xl font-semibold text-gray-800">
          <Title text1={"DELIVERY "} text2={" INFORMATION"} />
        </div>
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded-lg py-2 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded-lg py-2 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="number"
            placeholder="ZIP Code"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded-lg py-2 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="number"
          placeholder="Phone Number"
        />
      </div>

      <div className="w-full sm:w-[400px] flex flex-col gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <CartTotal />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <Title text1={"PAYMENT "} text2={" METHOD"} />
          <div className="flex gap-3 mt-4">
            <div
              className="flex items-center gap-3 border rounded-lg px-4 py-2 border-indigo-500 bg-indigo-50"
            >
              <p className="min-w-4 h-4 border rounded-full bg-indigo-500 border-indigo-500"></p>
              <p className="text-sm text-gray-700 font-medium">Cash on Delivery</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 text-sm font-medium rounded-full transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
