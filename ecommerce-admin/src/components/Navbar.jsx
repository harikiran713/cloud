import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-3 px-[5%] justify-between bg-white shadow-md'>
      {/* Logo */}
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />

      {/* Logout Button */}
      <button 
        onClick={() => setToken('')} 
        className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium transition'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
