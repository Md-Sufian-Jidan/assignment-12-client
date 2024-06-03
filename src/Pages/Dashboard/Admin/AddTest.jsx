import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils/Image";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { DateRange } from "react-date-range";

const AddTest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    // set the calender
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    //date range handler
    const handleDates = item => {
        console.log(item);
        setDates(item.selection);
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        setLoading(true)
        const name = data.name;
        const testCategory = data.testCategory;
        const price = data.price;
        const image = data.photo[0];
        const description = data.testDescription;
        // get the date from date range
        const from = dates.startDate; // this is start date 
        const to = dates.endDate; // this is end date
        // console.log(name, testCategory, price, image, description);
        const img_url = await imageUpload(image);
        console.log(img_url);
        const admin = {
            email: user?.email,
            photo: user?.photoURL,
            name: user?.displayName
        };
        const slot = 5;
        const testData = { name, testCategory, price, img_url, description, admin, slot, from, to }
        console.log(testData);
        await axiosSecure.post('/add-test', testData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success(`${name} is added to the database`);
                    reset();
                    setLoading(false);
                }
            })
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Add Test</title>
            </Helmet>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl text-center font-bold my-3">Add test</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-orange-400/40 px-16 py-5 rounded-xl space-y-2">
                    {/* test name && test price*/}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div>
                            <label className="text-xl font-medium" htmlFor="username">Test Name</label>
                            <input id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                                {...register("name", { required: true })} />
                            {errors.name && <span className="text-red-500">Test Name is required</span>}
                        </div>
                        <div>
                            <label className="text-xl font-medium" htmlFor="username">Test Price</label>
                            <input id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                                {...register("price", { required: true })} />
                            {errors.price && <span className="text-red-500">Test Price is required</span>}
                        </div>
                    </div>
                    {/* Test category && test image */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div>
                            <span className="text-xl font-medium">Test Category</span>
                            <select defaultValue="default" {...register("testCategory", { required: true, maxLength: 20 })} className="select select-bordered block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-300 focus:outline-none focus:ring">
                                <option disabled value="default">Select A Test Category</option>
                                <option value="Hematology">Hematology</option>
                                <option value="Biochemistry">Biochemistry</option>
                                <option value="Endocrinology">Endocrinology</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Urinalysis">Urinalysis</option>
                            </select>
                            {errors.testCategory && <span className="text-red-500">Test Category is required</span>}
                        </div>
                        <div>
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
                    </div>
                    {/* test date */}
                    {/* Calender */}
                    <div className='space-y-1 w-full'>
                        <label htmlFor='location' className='block text-gray-600'>
                            Select Availability Range
                        </label>
                        {/* Calender */}
                        <DateRange
                            rangeColors={['#1f1ac1']}
                            editableDateInputs={true}
                            onChange={item => handleDates(item)}
                            moveRangeOnFirstSelection={false}
                            ranges={[dates]}
                            minDate={new Date()}
                        />
                    </div>
                    {/* test description */}
                    <div>
                        <label className="text-xl font-medium" htmlFor="username">Test Price</label>
                        <textarea rows={5} id="username" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-slate-400 focus:outline-none focus:ring"
                            {...register("testDescription", { required: true })}></textarea>
                        {errors.testDescription && <span className="text-red-500">Test Description is required</span>}
                    </div>

                    <div className="flex justify-center mt-6">
                        {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                            <AiOutlineLoading3Quarters className=" animate-spin" size={20} />
                        </button> :
                            <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600">Add Test</button>}
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTest;