import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils/Image";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const AddBanner = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        setLoading(true)
        const name = data.name;
        const title = data.title;
        const couponCode = data.couponCode;
        const couponRate = data.couponRate;
        const image = data.photo[0];
        const description = data.description;
        const isActive = false;
        // console.log(name, testCategory, price, image, description);
        const img_url = await imageUpload(image);
        console.log(img_url);
        const admin = {
            email: user?.email,
            photo: user?.photoURL,
            name: user?.displayName
        }
        const testData = { name,  title,couponCode,couponRate, img_url, description, isActive,admin }
        console.log(testData);
        await axiosSecure.post('/add-banner', testData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success(`Banner is added to the database`);
                    reset();
                    setLoading(false);
                }
            })
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl text-center font-bold my-3">Add A Banner</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-t from-amber-700 to-amber-400 px-16 py-5 rounded-xl space-y-2">
               <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                 {/* Banner name */}
                 <div>
                    <label className="text-xl font-medium" htmlFor="username">Banner Name</label>
                    <input id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                        {...register("name", { required: true })} />
                    {errors.name && <span className="text-red-500">Banner Name is required</span>}
                </div>
                {/* Banner title */}
                <div>
                    <label className="text-xl font-medium" htmlFor="username">Banner Title</label>
                    <input id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                        {...register("title", { required: true })} />
                    {errors.title && <span className="text-red-500">Banner Title is required</span>}
                </div>
                <div>
                    <label className="text-xl font-medium" htmlFor="username">Banner Coupon Code</label>
                    <input id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                        {...register("couponCode", { required: true })} />
                    {errors.couponCode && <span className="text-red-500">Banner Coupon Code is required</span>}
                </div>
                <div>
                    <label className="text-xl font-medium" htmlFor="username">Banner Coupon Rate</label>
                    <input id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                        {...register("couponRate", { required: true })} />
                    {errors.couponRate && <span className="text-red-500">Banner Coupon Rate is required</span>}
                </div>
               </div>
                {/* Banner image */}
                <div>
                    <label htmlFor='image' className='text-xl font-medium'>
                        Banner Image:
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
                    {errors.photo && <span className="text-red-600">Banner Image is required</span>}
                </div>
                {/* Banner description */}
                <div>
                    <label className="text-xl font-medium" htmlFor="username">Banner Description</label>
                    <textarea rows={5} id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                        {...register("description", { required: true })}></textarea>
                    {errors.description && <span className="text-red-500">Banner Description is required</span>}
                </div>

                <div className="flex justify-center mt-6">
                    {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                        <AiOutlineLoading3Quarters className=" animate-spin" size={20} />
                    </button> :
                        <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-slate-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600">Add Banner</button>}
                </div>
            </form>
        </div>
    );
};

export default AddBanner;