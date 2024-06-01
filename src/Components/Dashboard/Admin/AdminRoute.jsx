// import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsFillHouseAddFill } from 'react-icons/bs'
// import { GrUserAdmin } from 'react-icons/gr'
// import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { MdHomeWork } from 'react-icons/md'
import useAuth from '../../../Hooks/useAuth'

const AdminRoute = () => {
    const { logout } = useAuth();
    
    return (
        <>
            <nav>
                {/* Statistics */}
                <NavLink
                    to='statistics'
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                        }`
                    }
                >
                    <BsGraphUp className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Statistics</span>
                </NavLink>

                {/* Add test */}
                <NavLink
                    to='add-room'
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                        }`
                    }
                >
                    <BsFillHouseAddFill className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Add Test</span>
                </NavLink>
                {/* All Test */}
                <NavLink
                    to='my-listings'
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                        }`
                    }
                >
                    <MdHomeWork className='w-5 h-5' />

                    <span className='mx-4 font-medium'>My Listings</span>
                </NavLink>
            </nav>
            <div>
                <hr />

                {/* Profile Menu */}
                <NavLink
                    to='/dashboard/profile'
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                        }`
                    }
                >
                    <FcSettings className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Profile</span>
                </NavLink>
                <button
                    onClick={logOut}
                    className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                >
                    <GrLogout className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Logout</span>
                </button>
            </div>
        </>
    );
};

export default AdminRoute;