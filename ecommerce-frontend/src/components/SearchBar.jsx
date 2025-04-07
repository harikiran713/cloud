import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    // Accessing context values for search functionality and visibility control
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

    // Local state to control the visibility of the search bar
    const [visible, setVisible] = useState(false);

    // Getting the current route location
    const location = useLocation();

    // Effect to control visibility based on the current route
    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true); // Show search bar if on the collection page
        } else {
            setVisible(false); // Hide search bar on other pages
        }
    }, [location]);

    // Render the search bar only if both showSearch and visible are true
    return showSearch && visible ? (
        <div className="border-t border-b bg-gray-50 text-center">
            {/* Search input field with styling */}
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                {/* Input field controlled by the search state */}
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="flex-1 outline-none bg-inherit text-sm"
                />
                {/* Search icon next to input */}
                <img src={assets.search_icon} className="w-4" alt="search" />
            </div>
            {/* Close icon to hide the search bar */}
            <img
                onClick={() => setShowSearch(false)}
                src={assets.cross_icon}
                className="inline w-3 cursor-pointer"
                alt="cross"
            />
        </div>
    ) : null; // Return null if search bar should not be visible
};

export default SearchBar;
