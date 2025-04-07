import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r bg-gray-50 shadow-md'>
      <div className='flex flex-col gap-4 pt-8 pl-[20%] text-sm font-medium text-gray-700'>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-l-full transition-colors ${
              isActive
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-indigo-100 hover:text-indigo-600'
            }`
          }
          to='/add'
        >
          <img className='w-5 h-5' src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-l-full transition-colors ${
              isActive
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-indigo-100 hover:text-indigo-600'
            }`
          }
          to='/list'
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-l-full transition-colors ${
              isActive
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-indigo-100 hover:text-indigo-600'
            }`
          }
          to='/orders'
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
