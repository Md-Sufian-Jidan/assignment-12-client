import toast from "react-hot-toast";
import { imageUpload } from "../../../utils/Image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { VscLoading } from "react-icons/vsc";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateTest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const test = useLoaderData();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        setLoading(true)
        const name = data.name;
        const testCategory = data.testCategory;
        const price = data.price;
        const image = data.photo[0];
        const description = data.testDescription;
        // console.log(name, testCategory, price, image, description);
        const img_url = await imageUpload(image);
        console.log(img_url);
        const admin = {
            email: user?.email,
            photo: user?.photoURL,
            name: user?.displayName
        }
        const testData = { name, testCategory, price, img_url, description, admin }
        console.log(testData);
        await axiosSecure.put(`/test-update/${test?._id}`, testData)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success(`${name} is updated to the database`);
                    navigate('/dashboard/all-tests')
                    reset();
                    setLoading(false);
                }
            })
    };



    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-yellow-400/40 px-16 py-5 rounded-xl space-y-2">
                {/* test name */}
                <div>
                    <label className="text-xl font-medium" htmlFor="username">Test Name</label>
                    <input defaultValue={test?.name} id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                        {...register("name", { required: true })} />
                    {errors.name && <span className="text-red-500">Test Name is required</span>}
                </div>
                {/* Test category */}
                <div>
                    <span className="text-xl font-medium">Test Category</span>
                    <select defaultValue={test?.category} {...register("testCategory", { required: true, maxLength: 20 })} className="select select-bordered block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-300 focus:outline-none focus:ring">
                        <option disabled value="default">Select A Test Category</option>
                        <option value="Hematology">Hematology</option>
                        <option value="Biochemistry">Biochemistry</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Urinalysis">Urinalysis</option>
                    </select>
                    {errors.testCategory && <span className="text-red-500">Test Category is required</span>}
                </div>
                {/* test price */}
                <div>
                    <label className="text-xl font-medium" htmlFor="username">Test Price</label>
                    <input defaultValue={test?.price} id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                        {...register("price", { required: true })} />
                    {errors.price && <span className="text-red-500">Test Price is required</span>}
                </div>
                {/* test image */}
                <div className="flex items-center gap-10">
                    <div className="flex-1">
                        <label htmlFor='image' className='text-xl font-medium'>
                            Select Image:
                        </label>
                        <input
                            className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-300 focus:outline-none focus:ring"
                            required
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            {...register("photo", { required: true })}
                        />
                        {errors.photo && <span className="text-red-600">Photo is required</span>}
                    </div>
                    <div>
                        <img className='h-28 w-full' alt="Menu Food Picture" src={test?.img_url} />
                    </div>
                </div>
                {/* test description */}
                <div>
                    <label className="text-xl font-medium" htmlFor="username">Test Price</label>
                    <textarea defaultValue={test?.description} rows={5} id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                        {...register("testDescription", { required: true })}></textarea>
                    {errors.testDescription && <span className="text-red-500">Test Description is required</span>}
                </div>

                <div className="flex justify-center mt-6">
                    {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                        <VscLoading className=" animate-spin" size={20} />
                    </button> :
                        <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600">Update Test</button>}
                </div>
            </form >
        </div >
    );
};

export default UpdateTest;