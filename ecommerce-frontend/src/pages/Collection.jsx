import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 bg-gradient-to-br from-gray-50 to-white px-4 sm:px-12 pt-10 pb-16 min-h-screen">
      
      {/* Sidebar Filters */}
      <aside className="w-full sm:w-72 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="flex justify-between items-center text-lg font-semibold text-gray-800 cursor-pointer sm:cursor-default"
        >
          Filters
          <img
            className={`h-3 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </div>

        <div className={`${showFilter ? "block" : "hidden"} mt-6 space-y-6`}>
          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Category</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="inline-flex items-center gap-2">
                  <input type="checkbox" value={cat} onChange={toggleCategory} className="accent-indigo-500" />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Type</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="inline-flex items-center gap-2">
                  <input type="checkbox" value={type} onChange={toggleSubCategory} className="accent-indigo-500" />
                  {type.replace("wear", " Wear")}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <section className="flex-1">
        {/* Title + Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Title text1={"All "} text2={" COLLECTION"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 bg-white px-4 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Collection;
