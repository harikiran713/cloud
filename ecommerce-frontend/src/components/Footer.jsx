import { assets } from "../assets/frontend_assets/assets"; // Importing asset paths from the assets module

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Getting the current year

    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm mx-auto">
                {/* Company Logo and Description */}
                <div>
                    <img src={assets.logo} className="mb-5 w-32" alt="Company Logo" /> {/* Displaying the company logo */}
                    <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti fuga sunt provident.</p> {/* Company description */}
                </div>
                {/* Company Links Section */}
                <div>
                    <p className="text-xl font-medium mb-5">Company</p> {/* Section title */}
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li> {/* Link to Home page */}
                        <li>About us</li> {/* Link to About Us page */}
                        <li>Delivery</li> {/* Link to Delivery information */}
                        <li>Privacy Policy</li> {/* Link to Privacy Policy */}
                    </ul>
                </div>
                {/* Contact Information Section */}
                <div>
                    <p className="text-xl font-medium mb-5">Get in Touch</p> {/* Section title */}
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+8801726308391</li> {/* Contact phone number */}
                        <li>jahed@ahmed.com</li> {/* Contact email address */}
                    </ul>
                </div>
            </div>
            {/* Footer Bottom Section */}
            <div>
                <hr /> {/* Horizontal line to separate content */}
                <p className="py-5 text-sm text-center">Copyright {currentYear}@ forever.com - All Right Reserved</p> {/* Dynamic copyright notice */}
            </div>
        </div>
    );
}

export default Footer;
