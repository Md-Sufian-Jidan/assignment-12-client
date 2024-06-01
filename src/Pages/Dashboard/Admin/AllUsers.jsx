import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrashCanArrowUp } from "react-icons/fa6";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-users')
            return data;
        }
    });
    const handleDelete = (id) => {
        console.log(id);
        refetch();
    }
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Image</th>
                        <th>User Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        users?.map((test, idx) => <tr key={test?._id}>
                            <th>{idx + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={test?.image} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{test?.name}</td>
                            <th>
                                <Link to={`/dashboard/update-test/${test?._id}`}>
                                    <button className="text-green-500 text-lg"><FaEdit /></button>
                                </Link>
                            </th>
                            <th>
                                <button onClick={() => handleDelete(test?._id)} className="text-red-500 text-lg"><FaTrashCanArrowUp /></button>
                            </th>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;