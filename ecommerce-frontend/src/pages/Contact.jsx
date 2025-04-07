// Import necessary assets and components
import { assets } from "../assets/frontend_assets/assets"
import { NewsLetterBox } from "../components/NewsLetterBox"
import Title from "../components/Title"

// Define the Contact component
const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="text-center text-2xl uppercase pt-10 border-t">
        {/* Reusable Title component to display the page title */}
        <Title text1={"Contact"} text2={"  us"} />
      </div>

      {/* Contact Information Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Contact Image */}
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="Contact Image" />

        {/* Store and Career Information */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            15, Surma Market <br /> VIP Road, Taltola, Sylhet
          </p>
          <p className="text-gray-500">
            Tel: +8801915443170 <br /> Email: hi@hello.com
          </p>

          {/* Career Information */}
          <p className="font-semibold text-xl text-gray-500">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our teams job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <NewsLetterBox />
    </div>
  )
}

export default Contact
