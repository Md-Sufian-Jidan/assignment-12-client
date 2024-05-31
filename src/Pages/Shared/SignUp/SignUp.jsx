import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils/Image";
import { districs } from "../../../../public/district";

const SignUp = () => {
    // custom hooks
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile, } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const image = data.photo[0];
        const bloodGroup = data.bloodGroup;
        const price = data.price;
        const districts = data.districts;
        const upozilas = data.upozilas;
        const confirmPassword = data.confirmPassword;
        // const confirmPassword = data.confirmPassword;
        console.log(name, password, email, image, confirmPassword);
        if (password !== confirmPassword) return toast.error('Password and confirm password will be same')
        const img_url = await imageUpload(image);
        console.log(img_url);
        createUser(email, password)
            .then((res) => {
                console.log(res.user);
                // TODO : save a user data in db
                const userInfo = {
                    name: name,
                    email: email,
                    bloodGroup,
                    price,
                    districts,
                    upozilas,
                    image: img_url,
                    status: 'active',
                };

                axiosPublic.post('/save/user', userInfo)
                    .then((res) => {
                        console.log(res.data);
                    })
                updateUserProfile(name, img_url)
                    .then((res) => {
                        console.log(res);
                        navigate('/'); // fix this before deploying your project
                        toast.success('User Created Successfully');
                    })

                    .catch(err => {
                        toast.error(`${err.message}`)
                        console.log(err);
                    })
            })
    }

    return (
        <section className="flex items-center gap-3 min-h-screen p-10 bg-contain bg-repeat-x bg-[url('https://i.ibb.co/dcLrzpC/blood-login.png')]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 h-full dark:bg-orange-800/50 p-6">
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                        <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            {...register("name", { required: true })} />
                        {errors.name && <span className="text-red-500">user Name is required</span>}

                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500">Email field is required</span>}
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                        <input id="password" type="password" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            {...register("password", { required: true })} />
                        {errors.password && <span className="text-red-500">Password is required</span>}
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Password Confirmation</label>
                        <input id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            {...register("confirmPassword", { required: true })} />
                        {errors.confirmPassword && <span className="text-red-500">Confirm Password field is required</span>}
                    </div>
                </div>

                <div className="form-control">
                    <div>
                        <label htmlFor='image' className='block mb-2 text-sm'>
                            Select Image:
                        </label>
                        <input
                            className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                            required
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            {...register("photo", { required: true })}
                        />
                    </div>
                    {errors.photoURL && <span className="text-red-600">Photo is required</span>}
                </div>


                {/* blood group */}
                <div className="flex justify-around items-center gap-6">
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Blood Group</span>
                        </div>
                        <select defaultValue="default" {...register("bloodGroup", { required: true, maxLength: 20 })} className="select select-bordered block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring">
                            <option disabled value="default">Select A Category</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </label>
                    {/* <input type="submit" /> */}
                </div>
                {/* district  */}
                <div className="flex justify-around items-center gap-6">
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Select Your District</span>
                        </div>
                        <select defaultValue="default" {...register("districts", { required: true, maxLength: 20 })} className="select select-bordered block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring">
                            <option disabled value="default">Select A Category</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Chattagram">Chattagram</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Rajshahi">Rajshahi</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Sylhet">Sylhet</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Mymensingh">Mymensingh</option>
                        </select>
                    </label>
                    {/* upozila */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Select Your Upozila</span>
                        </div>
                        <select defaultValue="default" {...register("upozilas", { required: true, maxLength: 20 })} className="select select-bordered block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring">
                            <option disabled value="default">Select A Category</option>
                            {districs.map(distritic => <option key={distritic?.id}>{distritic?.name}</option>)}
                        </select>
                    </label>
                </div>

                <div className="flex justify-center mt-6">
                    <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600">Sign In</button>
                </div>
                <p className="text-center mt-2">All Ready Have an Account? <Link className="underline hover:scale-110" to="/login">Then Login</Link></p>
            </form>
            {/* <div>
                <img src="https://i.ibb.co/dcLrzpC/blood-login.png" alt="" />
            </div> */}
            <div className="lg:w-1/2">
                <img className="w-[500px] h-[360px]" src="https://i.ibb.co/09VVhSX/donate-blood.png" alt="" />
            </div>
        </section>
    );
};

export default SignUp;