import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        setLatestProduct(products.slice(0, 10));
    }, [products]);

    return (
        <div className="my-16 px-4 sm:px-8 lg:px-16">
            <div className="text-center mb-10">
                <Title text1={"🆕 LATEST"} text2={" COLLECTION"} />
                <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-500">
                    Check out the newest arrivals from our fresh drop — just in and trending now!
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {latestProduct.map((item, index) => (
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

export default LatestCollection;
