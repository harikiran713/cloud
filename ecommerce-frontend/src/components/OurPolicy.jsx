import { assets } from "../assets/frontend_assets/assets"; // Importing asset paths from the assets module

const OurPolicy = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
            {/* Policy 1: Easy Exchange */}
            <div>
                <img src={assets.exchange_icon} alt="exchange_icon" className="w-12 m-auto mb-5" /> {/* Displaying exchange icon */}
                <p className="font-semibold">Easy Exchange Policy</p> {/* Title for the policy */}
                <p className="text-gray-400">We offer hassle free exchange policy</p> {/* Description of the policy */}
            </div>

            {/* Policy 2: 7 Days Return */}
            <div>
                <img src={assets.quality_icon} alt="quality_icon" className="w-12 m-auto mb-5" /> {/* Displaying quality icon */}
                <p className="font-semibold">7 Days Return Policy</p> {/* Title for the policy */}
                <p className="text-gray-400">We provide 7 days free return policy</p> {/* Description of the policy */}
            </div>

            {/* Policy 3: Customer Support */}
            <div>
                <img src={assets.support_img} alt="support_img" className="w-12 m-auto mb-5" /> {/* Displaying support icon */}
                <p className="font-semibold">Best Customer Support</p> {/* Title for the policy */}
                <p className="text-gray-400">We offer 24/7 Customer Support</p> {/* Description of the policy */}
            </div>
        </div>
    );
}

export default OurPolicy;
