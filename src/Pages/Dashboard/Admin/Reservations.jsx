import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../../../../Skeleton';
import { FaTrashCanArrowUp } from 'react-icons/fa6';
import { Helmet } from 'react-helmet';
const Reservations = () => {
    const axiosSecure = useAxiosSecure();
    const { data: bookings, refetch, isLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/booked/test')
            return data;
        }
    });

    // handle delete
    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                axiosSecure.delete(`/reservation-delete/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        });
    };
    if (isLoading) return <Skeleton />;

    return (
        <>
        <Helmet>
            <title>Dashboard | Reservations</title>
        </Helmet>
            <form className="max-w-xl mx-auto my-7">
                <label className="input input-bordered flex items-center gap-2 mx-10">
                    <input
                        // onChange={(e) => setSearch(e.target.value)}
                        // value={search}
                        type="text"
                        className="grow"
                        placeholder="Search" />
                    <span
                        // onClick={getData}
                        className="btn bg-violet-400/60">Search</span>
                </label>
            </form>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Image</th>
                            <th>Test Name</th>
                            <th>Booked By</th>
                            <th>Booked Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings?.map((test, idx) => <tr key={test?._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={test?.img_url} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{test?.name}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={test?.guest?.photo} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{test?.guest?.name}</div>
                                            <div className="text-sm opacity-50">{test?.guest?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{new Date(test?.date).toLocaleDateString()}</td>
                                <th>
                                    <button onClick={() => handleDelete(test?._id)} className="text-red-500 text-lg"><FaTrashCanArrowUp /></button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Reservations;