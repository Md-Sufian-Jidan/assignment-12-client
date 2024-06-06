import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import jsPDF from "jspdf";

const MyTestResult = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: result } = useQuery({
        queryKey: ['test-result'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-test-result/${user?.email}`)
            return data;
        },
    });

    const download = async (user) => {
        console.log(user);
        const res = await axiosSecure.post('/user-test-report', user);  // Adjust the endpoint as necessary
        console.log(res.data);
        const doc = new jsPDF();
        doc.text(`
                                   HealthScope Diagnostic Center

    Customer Name : ${res?.data?.singleUser?.name}         Customer Email : ${res?.data?.singleUser?.email}

    Customer Districts : ${res?.data?.singleUser?.districts}                Customer Upozila : ${res?.data?.singleUser?.upozilas
            }

     Customer Blood Group : ${res?.data?.singleUser?.bloodGroup}

                                            User Booking Details

    Total Bookings : ${res?.data?.userBookings?.length}

    1) Book Id : ${res?.data?.userBookings[0].bookId}       Book Date : ${new Date(res?.data?.userBookings[0].date).toLocaleDateString()}

    2) Test Name : ${res?.data?.userBookings[0].name}

    3) Test Category : ${res?.data?.userBookings[0].testCategory}

    4) Test Price : $${res?.data?.userBookings[0].price}

    5) Test Status : ${res?.data?.userBookings[0].status}

    For more comprehensive details and insights, please refer to the full
    PDF report.
        
    Thank you for choosing HealthScope for your diagnostic needs. We 
    trust that the results provided will guide you towards better health
    and well-being.For further assistance or detailed explanations, please
    do not hesitate to reach out to our support team.
                    
                        © 2024-2025 HealthScope All rights reserved.
                    `, 10, 10);
        doc.save("a4.pdf");
    }
    return (
        <>
            <Helmet>
                <title>Dashboard | My Test Result</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Image</th>
                            <th>Test Name</th>
                            <th>Result Date</th>
                            <th>Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            result?.map((test, idx) => <tr key={test?._id}>
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
                                <td>{new Date(test?.date).toDateString()}</td>
                                <td><span className="badge badge-outline bg-indigo-400/40 ">{test?.status}</span></td>
                                <th>
                                    <button
                                        disabled={test?.status === 'pending'}
                                        onClick={() => download(test)}
                                        className="badge badge-outline bg-red-400/60">Download</button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyTestResult;