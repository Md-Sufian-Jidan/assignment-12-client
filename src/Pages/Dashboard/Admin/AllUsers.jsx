import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { Link } from "react-router-dom";
// import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Skeleton from "../../../../Skeleton";
import { Helmet } from "react-helmet";
import { useState } from "react";
// import UserDetailsModal from "../../../Components/Dashboard/Modal/UserDetailsModal";
// import UpdateUserStatus from "../../../Components/Dashboard/Modal/UpdateUserStatus";
// import { FaTrashCanArrowUp } from "react-icons/fa6";
// import { FaRegEdit } from "react-icons/fa";
// import UpdateUserRoleModal from "../../../Components/Dashboard/Modal/UpdateUserRoleModal";

const AllUsers = () => {
    // handle update role
    const [updateRole, setUpdateRole] = useState();
    // handle status
    // const [status, setStatus] = useState(false);
    // const [select, setSelect] = useState('');
    // user details modal
    // const [isOpen, setIsOpen] = useState(false);

    const axiosSecure = useAxiosSecure();
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-users')
            return data;
        }
    });
    // close modal func
    // const closeModal = () => {
    //     setIsOpen(false);
    //     refetch();
    // };
    // update user role
    const handleRole = async (id) => {
        console.log(id);
        const res = await axiosSecure.patch(`/user/role/${id}`, { role: updateRole });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-start",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        }

    };

    // change a user status
    // const handleStatus = (test) => {
    //     console.log(test?._id);
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "Blocked this user from website",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Blocked The User"
    //     }).then((result) => {
    //         console.log(result);
    //         if (result.isConfirmed) {
    //             axiosSecure.patch(`/user-status/${test?._id}`, { status: select })
    //                 .then(res => {
    //                     console.log(res.data);
    //                     if (res.data.modifiedCount > 0) {
    //                         Swal.fire({
    //                             title: "Updated",
    //                             text: `${test?.name} have been Blocked by Admin."`,
    //                             icon: "success"
    //                         });
    //                         refetch();
    //                     }
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 })
    //         }
    //     });
    // }

    // handle delete
    // const handleDelete = (id) => {
    //     console.log(id);
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         console.log(result);
    //         if (result.isConfirmed) {
    //             axiosSecure.delete(`/user-delete/${id}`)
    //                 .then(res => {
    //                     console.log(res.data);
    //                     if (res.data.deletedCount > 0) {
    //                         Swal.fire({
    //                             title: "Deleted!",
    //                             text: "User has been deleted.",
    //                             icon: "success"
    //                         });
    //                         refetch();
    //                     }
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 })
    //         }
    //     });
    // };
    if (isLoading) return <Skeleton />
    return (
        <>
            <Helmet>
                <title>Dashboard | All Users</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Image</th>
                            <th>User Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Details</th>
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
                                {/* handle role */}
                                <td>
                                    <div>
                                        <select defaultValue={test?.role} onChange={(e) => {
                                            setUpdateRole(e.target.value)
                                            handleRole(test?._id);
                                        }}
                                            className="w-20 border rounded-xl p-1" name="" id="">
                                            <option className="bg-lime-400/40" value="admin">admin</option>
                                            <option className="bg-lime-400/40" value="guest">guest</option>
                                        </select>
                                    </div>
                                </td>


                                {/* handel status */}
                                <td>
                                    <div>
                                        <select defaultValue={test?.role} onChange={(e) => {
                                            setUpdateRole(e.target.value)
                                            handleRole(test?._id);
                                        }}
                                            className="w-20 border rounded-xl p-1" name="" id="">
                                            <option className="bg-lime-400/40" value="admin">admin</option>
                                            <option className="bg-lime-400/40" value="guest">guest</option>
                                        </select>
                                    </div>
                                    {/* <UpdateUserStatus closeModal={closeModal} isOpen={status} setSelect={setSelect} handleStatus={handleStatus} user={test} /> */}
                                </td>
                                {/* handle user details */}
                                <td>
                                    {/* <button onClick={() => setIsOpen(true)} className="badge badge-accent">View Details</button> */}
                                    {/* <UserDetailsModal closeModal={closeModal} bookingInfo={test}
                                        isOpen={isOpen} refetch={refetch} /> */}
                                </td>
                                <th>
                                    {/* <button onClick={() => handleDelete(test?._id)} className="text-red-500 text-lg"><FaTrashCanArrowUp /></button> */}
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllUsers;