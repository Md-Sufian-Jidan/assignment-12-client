import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import Skeleton from "../../../../Skeleton";

const MyAppointments = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: appointments, isLoading } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/appointments/${user?.email}`)
            return data;
        }
    });
    console.log(appointments);

    // handle delete
    const handleDelete = (id) => {
        console.log(id);
    };

    if (isLoading) return <Skeleton />;

    return (
        <>
            <Helmet>
                <title>Dashboard | My Appointments</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Image</th>
                            <th>Test Name</th>
                            <th>Test Category</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            appointments?.map((test, idx) => <tr key={test?._id}>
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
                                <td>{test?.testCategory}</td>
                                <td><span className="badge badge-outline bg-indigo-400/40 ">{test?.status}</span></td>
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

export default MyAppointments;