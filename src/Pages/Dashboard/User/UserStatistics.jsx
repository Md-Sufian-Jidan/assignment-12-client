import { FaDollarSign } from 'react-icons/fa6';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { GiPlayerTime } from 'react-icons/gi';
import UserChart from '../../../Components/Dashboard/Charts/UserChart';
// import { formatDistance, formatDistanceStrict } from 'date-fns';
// import { formatDistanceToNow } from 'date-fns';

const UserStatistics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: guest } = useQuery({
        queryKey: ['user-stat', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/guest-stat/${user?.email}`);
            return data;
        }
    })
    return (
        <div>
            <h2 className='text-4xl font-bold mt-3'>hi Welcome Back , {user?.displayName}</h2>
            <div className='mt-12'>
                {/* small cards */}
                <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3'>
                    {/* Spent Card */}
                    <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                        <div
                            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-600 to-lime-400 text-white shadow-orange-500/40`}
                        >
                            <FaDollarSign className='w-6 h-6 text-white' />
                        </div>
                        <div className='p-4 text-right'>
                            <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                Total Spent :
                            </p>
                            <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                ${guest?.totalSales}
                            </h4>
                        </div>
                    </div>

                    {/* Total Bookings */}
                    <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                        <div
                            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-gray-600 to-pink-400 text-white shadow-blue-500/40`}
                        >
                            <BsFillCartPlusFill className='w-6 h-6 text-white' />
                        </div>
                        <div className='p-4 text-right'>
                            <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                Total Bookings
                            </p>
                            <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                {guest?.totalBookings}
                            </h4>
                        </div>
                    </div>

                    {/* Users Card */}
                    <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                        <div
                            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-violet-600 to-sky-400 text-white shadow-green-500/40`}
                        >
                            <GiPlayerTime className='w-6 h-6 text-white' />
                        </div>
                        <div className='p-4 text-right'>
                            <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                Guest Since...
                            </p>
                            <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                {new Date(guest?.singleUser?.date).toLocaleTimeString()}
                                {/* {formatDistanceToNow(guest?.singleUser?.date)} */}
                                {/* {
                                    formatDistanceToNow(
                                        new Date(guest?.singleUser?.date),
                                        { includeSeconds: true }
                                    )
                                } */}
                                {/* {
                                    formatDistance(
                                        new Date(guest?.singleUser?.date),
                                        { includeSeconds: true }
                                      )
                                } */}
                                {/* {formatDistanceStrict(new Date(), new Date(guest?.singleUser?.date))} */}
                            </h4>
                        </div>
                    </div>
                </div>

                <div className='mb-4'>

                    <UserChart chartData={guest} />
                </div>
            </div>
        </div>
    );
};

export default UserStatistics;