import { useLoaderData } from "react-router-dom";

const SingleTest = () => {
    const test = useLoaderData();
    return (
        <div className="flex overflow-hidden rounded-lg shadow-lg my-5 ">
            <div className="w-1/3 bg-cover">
                <img src={test?.img_url} alt="" />
            </div>

            <div className="w-2/3 p-4 md:p-4">
                <h1 className="text-xl font-bold">Test Name : {test?.name}</h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Test About : {test?.description}</p>

                <div className="flex justify-around mt-3 item-center">
                    <h1 className="text-lg font-bold md:text-xl">Price : ${test?.price}</h1>
                    <h1 className="text-lg font-bold md:text-xl">Test Category : {test?.testCategory}</h1>
                </div>
                <h1 className="text-lg my-2 font-bold md:text-xl">Test Date : {new Date(test?.date).toLocaleDateString()}</h1>
                <div>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mt-2">
                        <div className="w-10 rounded-full">
                            <img alt="Author Picture" src={test?.admin?.photo} />
                        </div>
                    </div>
                    <h2 className="font-bold" >Author : <span className="font-semibold">{test?.admin?.name}</span></h2>
                </div>
            </div>
        </div>
    );
};

export default SingleTest;