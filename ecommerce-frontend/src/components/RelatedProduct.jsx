import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const RelatedProduct = ({ category, subCategory }) => {
    // Access the products from ShopContext
    const { products } = useContext(ShopContext);

    // State to hold the related products
    const [related, setRelated] = useState([]);

    // Effect to filter and set related products based on category and subCategory
    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice(); // Create a shallow copy of products array

            // Filter products by category
            productCopy = productCopy.filter((item) => category === item.category);

            // Further filter products by subCategory
            productCopy = productCopy.filter((item) => subCategory === item.subCategory);

            // Set the first 5 related products to state
            setRelated(productCopy.slice(0, 5));
        }
    }, [products, category, subCategory]); // Dependency array includes products, category, and subCategory

    return (
        <div className="my-24">
            {/* Title Section */}
            <div className="text-center text-3xl py-2">
                <Title text1={'RELATED '} text2={" PRODUCTS"} />
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default RelatedProduct;
