import BestSeller from "../components/BestSeller"; // Importing BestSeller component
import Hero from "../components/Hero"; // Importing Hero component
import LatestCollection from "../components/LatestCollection"; // Importing LatestCollection component
import { NewsLetterBox } from "../components/NewsLetterBox"; // Importing NewsLetterBox component
import OurPolicy from "../components/OurPolicy"; // Importing OurPolicy component

const Home = () => {
  return (
    <div>
      <Hero /> {/* Displaying the Hero section */}
      <LatestCollection /> {/* Displaying the Latest Collection section */}
      <BestSeller /> {/* Displaying the Best Seller section */}
     
     
    </div>
  );
}

export default Home;
