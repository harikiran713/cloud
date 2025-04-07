import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    return (
        <div className="border-t pt-14 bg-gray-50 min-h-screen">
            {/* Title Section */}
            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            <div>
                {
                    cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);
                        return (
                            <div
                                key={index}
                                className="py-5 border-y border-gray-200 bg-white px-4 sm:px-6 rounded-md mb-3 shadow-sm grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                            >
                                <div className="flex items-center gap-6">
                                    <img className="w-16 sm:w-20 rounded-md" src={productData.image[0]} alt="" />
                                    <div>
                                        <p className="text-sm sm:text-lg font-medium text-gray-800">{productData.name}</p>
                                        <div className="flex items-center gap-4 mt-2 text-sm">
                                            <p className="text-indigo-600 font-semibold">{currency}{productData.price}</p>
                                            <p className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs uppercase">{item.size}</p>
                                        </div>
                                    </div>
                                </div>

                                <input
                                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                    className="border border-gray-300 rounded-md px-2 py-1 text-center w-full max-w-[60px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />

                                <img
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                    className="w-5 cursor-pointer transition-transform hover:scale-110"
                                    src={assets.bin_icon}
                                    alt="Delete"
                                />
                            </div>
                        );
                    })
                }
            </div>

            {/* Cart Summary and Checkout */}
            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px] bg-white p-6 rounded-xl shadow-lg">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button
                            onClick={() => navigate('/place-order')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium mt-6 px-6 py-3 rounded-lg transition-colors"
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
