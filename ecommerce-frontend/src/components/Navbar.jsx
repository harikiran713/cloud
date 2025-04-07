import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets.js';
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  }

  return (
    <div className="relative z-50 flex items-center justify-between py-5 font-medium bg-white shadow-sm px-4 md:px-8">
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt="logo" />
      </Link>

      <ul className='hidden sm:flex gap-6 text-sm text-gray-700'>
        <NavLink to='/' className='hover:text-indigo-600 transition'>Home</NavLink>
        <NavLink to='/collection' className='hover:text-indigo-600 transition'>Collection</NavLink>
    
      </ul>

      <div className='flex items-center gap-6 text-gray-700'>
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="search"
          className='w-5 cursor-pointer hover:opacity-75'
        />

        <div className='group relative'>
          <img
            onClick={() => token ? null : navigate('/login')}
            src={assets.profile_icon}
            alt="profile"
            className='w-5 cursor-pointer hover:opacity-75'
          />
          {
            token &&
            <div className='group-hover:block hidden absolute right-0 pt-4 z-50'>
              <div className='flex flex-col gap-2 w-40 py-3 bg-white shadow-md text-gray-600 rounded-md text-sm'>
                <p className='cursor-pointer hover:bg-gray-100 px-4 py-1'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:bg-gray-100 px-4 py-1'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:bg-gray-100 px-4 py-1 text-red-500'>Logout</p>
              </div>
            </div>
          }
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5' alt="cart" />
          <p className='absolute right-[-6px] bottom-[-6px] w-4 h-4 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center'>
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt="menu"
        />
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white shadow-lg transition-all duration-300 z-40 ${visible ? 'w-full max-w-sm' : 'w-0'}`}>
        <div className='flex flex-col text-gray-700'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer bg-gray-100'>
            <img src={assets.dropdown_icon} alt="dropdown" className='h-4 rotate-180' />
            <p className='text-sm font-medium'>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-100' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-100' to='/collection'>Collection</NavLink>
     
        </div>
      </div>
    </div>
  );
}

export default Navbar;
