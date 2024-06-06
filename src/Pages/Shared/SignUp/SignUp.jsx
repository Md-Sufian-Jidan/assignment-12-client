import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils/Image";
import { districs } from "../../../../public/district";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { VscLoading } from "react-icons/vsc";

const SignUp = () => {
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // custom hooks
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
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
        // console.log(name, password, email, image, confirmPassword);
        if (password.length < 6) {
            return toast.error('Your password should at least 6 character long');
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error('Your password should contain a Capital letter')
        }
        if (!/[a-z]/.test(password)) {
            return toast.error('Your password should contain a lower letter')
        }
        if (password !== confirmPassword) {
            setLoading(false);
            return toast.error('Password and confirm password will be same')
        }
        const img_url = await imageUpload(image);
        // console.log(img_url);
        createUser(email, password)
            .then(() => {
                // console.log(res.user);
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
                    role: 'guest',
                    date: new Date(),
                };

                axiosPublic.post('/save/user', userInfo)
                    .then((res) => {
                        console.log(res.data);
                    })
                updateUserProfile(name, img_url)
                    .then((res) => {
                        console.log(res);
                        setLoading(false);
                        navigate('/'); // fix this before deploying your project
                        toast.success('User Created Successfully');
                    })

                    .catch(err => {
                        setLoading(false);
                        toast.error(`${err.message}`);
                        console.log(err);
                    })
            })
    }

    return (
        <>
            <Helmet>
                <title>Sign Up Page</title>
            </Helmet>
            <section className="flex items-center gap-3 min-h-screen p-10 bg-contain bg-repeat-x bg-[url('https://i.ibb.co/KDxw8sN/ravi23-may-15.jpg')]">
                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 dark:bg-orange-800/60 p-6 max-w-3xl mx-auto rounded-xl">
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
                        {/* password */}
                        <div className="relative">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                            <input id="password" type={show ? "text" : "password"} className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                                {...register("password", { required: true })} />
                            {errors.password && <span className="text-red-500">Password is required</span>}
                            <span className="absolute top-[45px] right-3" onClick={() => setShow(!show)}>
                                {show ?
                                    <FaEye /> :
                                    <FaEyeSlash />
                                }
                            </span>
                        </div>
                        {/* confirm password */}
                        <div className="relative">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Password Confirmation</label>
                            <input id="passwordConfirmation" type={showPassword ? "text" : "password"} className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                                {...register("confirmPassword", { required: true })} />
                            {errors.confirmPassword && <span className="text-red-500">Confirm Password field is required</span>}
                            <span className="absolute top-[45px] right-3" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <FaEye /> :
                                    <FaEyeSlash />
                                }
                            </span>
                        </div>
                        {/* select image */}
                        <div>
                            <label htmlFor='image' className='block text-gray-700 dark:text-gray-200'>
                                Select Image:
                            </label>
                            <input
                                className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring"
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                                {...register("photo", { required: true })}
                            />
                            {errors.photoURL && <span className="text-red-600">Photo is required</span>}
                        </div>
                        {/* blood group */}
                        <div>
                            <span className="label-text text-gray-700 dark:text-gray-200">Blood Group</span>
                            <select defaultValue="default" {...register("bloodGroup", { required: true, maxLength: 20 })} className="select select-bordered block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring">
                                <option disabled value="default">Select A Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        {/* district  */}
                        <div>
                            <span className="label-text text-gray-700 dark:text-gray-200">Select Your District</span>
                            <select defaultValue="default" {...register("districts", { required: true, maxLength: 20 })} className="select select-bordered block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring">
                                <option disabled value="default">Select A District</option>
                                <option value="Barisal">Barisal</option>
                                <option value="Chattagram">Chattagram</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Mymensingh">Mymensingh</option>
                            </select>
                        </div>
                        {/* upozila */}
                        <div>
                            <span className="label-text text-gray-700 dark:text-gray-200">Select Your Upozila</span>
                            <select defaultValue="default" {...register("upozilas", { required: true, maxLength: 20 })} className="select select-bordered block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring">
                                <option disabled value="default">Select A Upozila</option>
                                {districs.map(distritic => <option key={distritic?.id}>{distritic?.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                            <VscLoading className=" animate-spin" size={20} />
                        </button> : <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600">Sign Up</button>}
                    </div>
                    <p className="text-center mt-2 text-white">All Ready Have an Account? <Link className="underline hover:scale-110" to="/login">Then Login</Link></p>
                </form>
            </section>
        </>
    );
};

export default SignUp;