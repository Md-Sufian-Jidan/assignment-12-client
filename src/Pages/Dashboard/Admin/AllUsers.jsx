import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Skeleton from "../../../../Skeleton";
import { Helmet } from "react-helmet";
import UserDetailsModal from "../../../Components/Dashboard/Modal/UserDetailsModal";
import { useState } from "react";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users, refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-users')
            return data;
        }
    });
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

    // const download = async (user) => {
    //     try {
    //         const res = await axiosSecure.post('/user/download', user);  // Adjust the endpoint as necessary
    //         console.log(res.data);

    //         // Create a container for the HTML content
    //         const container = document.createElement('div');
    //         container.style.display = 'none';  // Hide the container
    //         container.innerHTML = `
    //             <div>
    //                 <div style="display: flex; justify-content: space-between;">
    //                     <h1>Name: ${res?.data?.singleUser?.name}</h1>
    //                     <h1>Email: ${res?.data?.singleUser?.email}</h1>
    //                 </div>
    //                 <div style="overflow-x: auto;">
    //                     <table style="width: 100%; border-collapse: collapse;">
    //                         <thead>
    //                             <tr>
    //                                 <th style="border: 1px solid black;">Booked No</th>
    //                                 <th style="border: 1px solid black;">User Name</th>
    //                                 <th style="border: 1px solid black;">Test Category</th>
    //                                 <th style="border: 1px solid black;">Test Date</th>
    //                                 <th style="border: 1px solid black;">Test Price</th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             ${res?.data?.UserTestBooked?.map((booked, idx) => `
    //                                 <tr key=${booked?._id} style="background-color: ${idx % 2 === 0 ? '#f0f0f0' : 'transparent'};">
    //                                     <td style="border: 1px solid black;">${idx + 1}</td>
    //                                     <td style="border: 1px solid black;">${booked?.name}</td>
    //                                     <td style="border: 1px solid black;">${booked?.testCategory}</td>
    //                                     <td style="border: 1px solid black;">${new Date(booked?.date).toLocaleDateString()}</td>
    //                                     <td style="border: 1px solid black;">${booked?.price}</td>
    //                                 </tr>`)}
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>
    //         `;

    //         // Append the container to the body (hidden)
    //         document.body.appendChild(container);

    //         // Convert the HTML to canvas using html2canvas
    //         const canvas = await html2canvas(container, { useCORS: true });
    //         const imgData = canvas.toDataURL('image/png');
    //         const doc = new jsPDF();

    //         // Add the image to the PDF
    //         doc.addImage(imgData, 'PNG', 0, 0, 210, 297);  // Adjust width and height if necessary
    //         doc.save("report.pdf");

    //         // Remove the container from the body
    //         document.body.removeChild(container);
    //     } catch (err) {
    //         console.error('Error generating PDF:', err);
    //     }
    // };
    const download = async (user) => {
        const res = await axiosSecure.post('/user/download', user);  // Adjust the endpoint as necessary
        console.log(res.data);
        const doc = new jsPDF();
        doc.text(`
                                    HealthScope Diagnostic Center

    User Name : ${res?.data?.singleUser?.name}         User Email : ${res?.data?.singleUser?.email}

    User Districts : ${res?.data?.singleUser?.districts}                User Upozila : ${res?.data?.singleUser?.upozilas
            }

     Blood Group : ${res?.data?.singleUser?.bloodGroup}

                                            User Booking Details

    Total Bookings : ${res?.data?.userBookings?.length}

    1) Book Id : ${res?.data?.userBookings[0].bookId}       Book Date : ${new Date(res?.data?.userBookings[0].date).toLocaleDateString()}

    2) Test Name : ${res?.data?.userBookings[0].name}

    3) Test Category : ${res?.data?.userBookings[0].testCategory}

    4) Test Price : $${res?.data?.userBookings[0].price}

    5) Test Status : ${res?.data?.userBookings[0].status}
        
    Thank you for choosing HealthScope for your diagnostic needs. We 
    trust that the results provided will guide you towards better health
    and well-being.For further assistance or detailed explanations, please
    do not hesitate to reach out to our support team.
                    
                        © 2024-2025 HealthScope All rights reserved.
                    `, 10, 10);
        doc.save("a4.pdf");
    }

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
                                        <select defaultValue={test?.role} className="p-1 rounded-lg bg-gradient-to-tr from-sky-300/40 to-sky-400" onChange={(e) => {
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
                                <th>
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