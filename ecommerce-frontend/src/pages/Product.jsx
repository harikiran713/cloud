import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        const product = products.find((item) => item._id === productId);
        if (product) {
            setProductData(product);
            setImage(product.image[0]);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    const handleAddToCart = () => {
        if (size) {
            addToCart(productData._id, size);
        } else {
            alert("Please select a size before adding to cart.");
        }
    }

    return productData ? (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-gray-50 px-4 sm:px-10">
            <div className="flex gap-12 flex-col sm:flex-row">
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {
                            productData.image.map((item, index) => (
                                <img
                                    src={item}
                                    key={index}
                                    className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg border hover:border-indigo-500"
                                    alt={`Thumbnail ${index + 1} for ${productData.name}`}
                                    onClick={() => setImage(item)}
                                />
                            ))
                        }
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto rounded-xl shadow-lg" src={image} alt={`Main view of ${productData.name}`} />
                    </div>
                </div>
                <div className="flex-1 text-gray-800">
                    <h1 className="font-semibold text-3xl mt-2 text-indigo-900">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-3">
                        {Array(4).fill().map((_, i) => (
                            <img key={i} src={assets.star_icon} alt={`Star ${i + 1}`} className="w-4" />
                        ))}
                        <img src={assets.star_dull_icon} alt="Star 5" className="w-4" />
                        <p className="pl-2 text-sm text-gray-500">(122 Reviews)</p>
                    </div>
                    <p className="mt-5 text-4xl font-bold text-indigo-700">{currency}{productData.price}</p>
                    <p className="mt-5 text-gray-600 md:w-4/5 leading-relaxed">{productData.description}</p>

                    <div className="flex flex-col gap-4 my-8">
                        <p className="font-medium text-gray-700">Select Size</p>
                        <div className="flex gap-2 flex-wrap">
                            {productData.sizes.map((item, index) => (
                                <button
                                    onClick={() => setSize(item)}
                                    className={`border py-2 px-4 rounded-full text-sm font-medium ${item === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'}`}
                                    key={index}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-indigo-700 text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-indigo-800 transition"
                    >
                        Add to Cart
                    </button>

                    <hr className="mt-10 sm:w-4/5 border-gray-300" />
                    <div className="text-sm text-gray-600 mt-6 flex flex-col gap-2">
                        <p>✅ 100% Original Product</p>
                        <p>💰 Cash on Delivery is available</p>
                        <p>🔄 Easy return and exchange within 7 days</p>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm bg-white text-gray-800">Description</b>
                    <p className="border px-5 py-3 text-sm text-gray-500">Review (122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600 bg-white">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora, repellendus, repudiandae atque optio est distinctio praesentium blanditiis id eaque perferendis exercitationem. Eius est rerum impedit quas, deleniti incidunt voluptate!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cumque consequatur accusantium quibusdam sequi nisi aut temporibus hic, est a ratione sit minima, nostrum amet minus?</p>
                </div>
            </div>

            <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : <div className="opacity-0">Loading...</div>
}

export default Product;
