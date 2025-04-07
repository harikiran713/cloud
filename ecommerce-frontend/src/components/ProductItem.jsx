import { useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img className="hover:scale-110 transition ease-out" src={image[0]} alt={name} />
                <p className="pt-3 pb-1 text-sm">{name}</p>
                <p className="text-sm font-medium">{currency}{price}</p>
            </div>
        </Link>
    );
};

// Define prop types for the component
ProductItem.propTypes = {
    id: PropTypes.string.isRequired,       // Assuming 'id' is a string, change to PropTypes.number if it's numeric
    image: PropTypes.arrayOf(PropTypes.string).isRequired,  // Assuming 'image' is an array of strings
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,    // Assuming 'price' is a number
};

export default ProductItem;
