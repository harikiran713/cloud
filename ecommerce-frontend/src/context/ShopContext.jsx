import PropTypes from "prop-types"; // Import PropTypes for type checking
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create a new context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    // Static data related to the shop
    const currency = "$"; // Default currency
    const delivery_fee = 10; // Standard delivery fee
    const backendUrl = "https://cloud-5.onrender.com";
    const backendUrl1 = "https://cloud-2-77ye.onrender.com/";
    // State for search functionality
    const [search, setSearch] = useState(''); // Stores the search query
    const [showSearch, setShowSearch] = useState(false); // Controls the visibility of the search bar
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]); // Stores the list of products
    const [token, setToken] = useState('');
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;

        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl1 + '/api/cart/add', { itemId, size }, { headers: { token } });

            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }

        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl1 + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });

            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }

        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl1 + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl1 + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    // Combine all the state and static data into a single value object
    const value = {
        products, // Product list
        currency, // Currency symbol
        delivery_fee, // Delivery fee
        search, setSearch, // Search state and setter
        showSearch, setShowSearch,
        cartItems, addToCart, setCartItems, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken,backendUrl1
        // Search bar visibility state and setter
    };

    return (
        // Provide the value object to all children of ShopContextProvider
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

// Define prop types for the component
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children are passed and are of node type
};

export default ShopContextProvider;
