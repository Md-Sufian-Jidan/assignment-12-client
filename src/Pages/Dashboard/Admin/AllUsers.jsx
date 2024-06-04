import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { Link } from "react-router-dom";
// import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Skeleton from "../../../../Skeleton";
import { Helmet } from "react-helmet";
import UserDetailsModal from "../../../Components/Dashboard/Modal/UserDetailsModal";
import { useRef, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users, refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-users')
            return data;
        }
    });
    const pdfRef = useRef();
    // user details modal
    const [isOpen, setIsOpen] = useState(false);
    // close modal func
    const closeModal = () => {
        setIsOpen(false);
    };
    // update user role
    const handleRole = async (id, role) => {
        // console.log(role);
        const res = await axiosSecure.patch(`/user/role/${id}`, { role: role });
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-start",
                icon: "success",
                title: `User Updated to ${role}`,
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };
    const handleStatus = async (id, status) => {
        console.log(id);
        console.log(status);
        const res = await axiosSecure.patch(`/user/status/${id}`, { status: status });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `User has been ${status}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    // change a user status

    const download = async (user) => {
        console.log('download');
        const input = pdfRef.current;
        // console.log(input);
        // setIsLoading(true);
        html2canvas(input).then((canvas) => {
            const imageData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4", true);
            const width = pdf.internal.pageSize.getWidth();
            const hight = pdf.internal.pageSize.getHeight();
            const imageWidth = canvas.width;
            const imageHight = canvas.hight;
            const ratio = Math.min(width / imageWidth, hight / imageHight);
            const imgX = (width - imageWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imageData, 'PNG', imgX, imgY, width * ratio, hight * ratio);
            // setIsLoading(false);
            pdf.save('report.pdf');
        });
        console.log(user);
        const res = await axiosSecure.post('/user/download', user);
        console.log(res.data);
        console.log('html');
        // setUserTestBooked(bookedTest);
        // setSingleUser(res.data);
        // console.log(res.data);
        // console.log(bookedTest.data);
    };

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
                        <tr className="bg-slate-200/80">
                            <th>#</th>
                            <th>User Image</th>
                            <th>User Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users?.map((test, idx) => <tr className={`${idx % 2 !== 0 ? "bg-slate-200/50 rounded-xl" : ""}`} key={test?._id}>
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
                                        <select className="p-1 rounded-lg bg-gradient-to-tr from-sky-300/40 to-sky-400" onChange={(e) => {
                                            handleRole(test?._id, e.target.value)
                                        }} name="" id="">
                                            <option value="admin">admin</option>
                                            <option value="guest">guest</option>
                                        </select>
                                    </div>
                                </td>

                                {/* handel status */}
                                <td>
                                    <select defaultValue={test?.status} className="rounded-lg bg-gradient-to-tr from-pink-300/40 to-pink-400/40 p-1" onChange={(e) => {
                                        handleStatus(test?._id, e.target.value)
                                    }} name="" id="">
                                        <option value="active">active</option>
                                        <option value="blocked">blocked</option>
                                    </select>
                                </td>
                                {/* handle user details */}
                                <td>
                                    <button onClick={() => setIsOpen(true)} className="btn-sm btn-info ">View Details</button>
                                    <UserDetailsModal closeModal={closeModal} bookingInfo={test}
                                        isOpen={isOpen} refetch={refetch} />
                                </td>
                                <th ref={pdfRef}>
                                    <button onClick={() => download(test)} className="btn">Download</button>
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