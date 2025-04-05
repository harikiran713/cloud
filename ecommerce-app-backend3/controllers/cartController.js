import userModel from '../models/userModel.js'; // Import the user model

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        // Fetch user data
        const userData = await userModel.findById(userId);

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {};

        // Initialize the item if it doesn't exist
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Initialize the size if it doesn't exist
        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 0;
        }

        // Increment the quantity for the size
        cartData[itemId][size] += 1;

        // Update the user's cartData in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Added to Cart' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Fetch user data
        const userData = await userModel.findById(userId);

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {};

        // Initialize the item if it doesn't exist
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Update the quantity for the specified size
        cartData[itemId][size] = quantity;

        // Update the user's cartData in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Cart Updated' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch user data
        const userData = await userModel.findById(userId);

        // Retrieve cartData or set it to an empty object if undefined
        const cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart }; // Export the functions
