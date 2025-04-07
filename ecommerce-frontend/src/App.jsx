import { Route, Routes } from "react-router-dom"; // Importing routing components from react-router-dom
import Home from "./pages/Home"; // Importing the Home page component
import Collection from "./pages/Collection"; // Importing the Collection page component
import About from "./pages/About"; // Importing the About page component
import Contact from "./pages/Contact"; // Importing the Contact page component
import Product from "./pages/Product"; // Importing the Product page component
import Cart from "./pages/Cart"; // Importing the Cart page component
import Login from "./pages/Login"; // Importing the Login page component
import PlaceOrder from "./pages/PlaceOrder"; // Importing the PlaceOrder page component
import Orders from "./pages/Orders"; // Importing the Orders page component
import Navbar from "./components/Navbar"; // Importing the Navbar component
import Footer from "./components/Footer"; // Importing the Footer component
import SearchBar from "./components/SearchBar"; // Importing the SearchBar component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar /> {/* Rendering the Navbar component */}
      <SearchBar /> {/* Rendering the SearchBar component */}
      <Routes> {/* Defining routes for different pages */}
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/collection" element={<Collection />} /> {/* Collection page route */}
        <Route path="/about" element={<About />} /> {/* About page route */}
        <Route path="/contact" element={<Contact />} /> {/* Contact page route */}
        <Route path="/product/:productId" element={<Product />} /> {/* Product details page route with dynamic product ID */}
        <Route path="/cart" element={<Cart />} /> {/* Cart page route */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/place-order" element={<PlaceOrder />} /> {/* Place order page route */}
        <Route path="/orders" element={<Orders />} /> {/* Orders page route */}
        <Route path="/verify" element={<Verify />} /> {/* Verify page route */}
      </Routes>
      <Footer /> {/* Rendering the Footer component */}
    </div>
  );
}

export default App;
