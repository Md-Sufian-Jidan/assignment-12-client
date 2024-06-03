import { Helmet } from 'react-helmet';
import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';
import UpdateUserProfile from '../Form/UpdateUserProfile';
import { useState } from 'react';
import Skeleton from '../../../../Skeleton';

const Profile = () => {
    const { user } = useAuth();
    const [role, isLoading] = useRole();
    console.log(role);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    console.log(user)
    if (isLoading) return <Skeleton />
    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-white shadow-lg rounded-2xl w-3/5'>
                    <img
                        alt='profile'
                        src={user?.photoURL}
                        className='w-full mb-4 rounded-t-lg h-36'
                    />
                    <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                        <div className='relative block'>
                            <img
                                alt='profile'
                                src={user?.photoURL}
                                className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                            />
                        </div>
                        <p className='mt-2 text-xl font-medium text-gray-800 '>
                            User Id: {user?.uid}
                        </p>
                        <p className='p-2 px-4 text-xs text-white bg-indigo-500 rounded-full '>
                            {/* {role?.role.split('')[0].toUpperCase() + role?.role.substring(1,4)} */}
                            {role?.split('')[0].toUpperCase() + role?.substring(1, 5)}
                        </p>

                        <div className='w-full p-2 mt-4 rounded-lg'>
                            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                                <p className='flex flex-col'>
                                    Name
                                    <span className='font-bold text-black '>
                                        {user?.displayName}
                                    </span>
                                </p>
                                <p className='flex flex-col'>
                                    Email
                                    <span className='font-bold text-black '>{user?.email}</span>
                                </p>

                                <div>
                                    <button onClick={() => setIsOpen} className='bg-indigo-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                        Update Profile
                                    </button>
                                    <UpdateUserProfile closeModal={closeModal} isOpen={isOpen} bookingInfo={user} />
                                    {/* <button className='bg-indigo-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                                        Change Password
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile