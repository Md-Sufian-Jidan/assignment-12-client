import { useParams } from "react-router-dom";
import BookingModal from "../../../Components/Dashboard/Modal/BookingModal";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Skeleton from "../../../../Skeleton";
import { useQuery } from "@tanstack/react-query";

const SingleTest = () => {
    // const test = useLoaderData();
    const { id } = useParams();
    console.log(id);
    const axiosSecure= useAxiosSecure();
    const [disable, setDisable] = useState(false);
    
    const { data: test = {}, isLoading, refetch } = useQuery({ // : alise
        queryKey: ["room", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/details/${id}`);
            return data;
        }
    });
    console.log(test);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
        setDisable(false);
    };
    if(isLoading) return <Skeleton />
    return (
        <div className="flex overflow-hidden rounded-lg shadow-lg my-5 ">
            <div className="w-1/3 bg-cover">
                <img src={test?.img_url} alt="" />
            </div>

            <div className="w-2/3 p-4 md:p-4 bg-green-500/20">
                <h1 className="text-xl font-bold">Test Name : {test?.name}</h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Test About : {test?.description}</p>

                <div className="flex justify-around mt-3 item-center">
                    <h1 className="text-lg font-bold md:text-xl">Price : ${test?.price}</h1>
                    <h1 className="text-lg font-bold md:text-xl">Test Category : {test?.testCategory}</h1>
                </div>
                <h1 className="text-lg my-2 font-bold md:text-xl">Test Date : {new Date(test?.date).toLocaleDateString()}</h1>
                <div className="flex justify-evenly items-center gap-3">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mt-2">
                        <div className="w-10 rounded-full">
                            <img alt="Author Picture" src={test?.admin?.photo} />
                        </div>
                    </div>
                    <h2 className="font-bold" >Author : <span className="font-semibold">{test?.admin?.name}</span></h2>
                    <h1 className="font-bold">Remember Booking : {test?.slot} More</h1>
                    <button disabled={test?.slot < 1} onClick={() => setIsOpen(true)} className="btn w-44 bg-gradient-to-t from-violet-400 to-violet-600">Booked</button>
                </div>
                <BookingModal closeModal={closeModal} isOpen={isOpen} bookingInfo={test} refetch={refetch} disable={disable} setDisable={setDisable} />
            </div>
        </div>
    );
};

export default SingleTest;