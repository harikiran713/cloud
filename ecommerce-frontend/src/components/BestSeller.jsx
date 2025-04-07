import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className="my-16 px-4 sm:px-8 lg:px-16">
            <div className="text-center mb-10">
                <Title text1={"🔥 BEST"} text2={" SELLERS"} />
                <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-500">
                    Discover our top-rated picks loved by everyone. These best sellers are handpicked just for you!
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {bestSeller.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
