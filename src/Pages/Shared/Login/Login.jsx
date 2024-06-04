import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";
import { VscLoading } from "react-icons/vsc";
import useStatus from '../../../Hooks/useStatus'
const Login = () => {
    const { loginUser } = useAuth();
    const [status] = useStatus();
    console.log(status);
    // custom state
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // login a user
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        const email = data.email;
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        if (password.length < 6) {
            setLoading(false);
            return toast.error('Your password should at least 6 character long');
        }
        if (!/[A-Z]/.test(password)) {
            setLoading(false);
            return toast.error('Your password should contain a Capital letter')
        }
        if (!/[a-z]/.test(password)) {
            setLoading(false);
            return toast.error('Your password should contain a lower letter')
        }
        if (password !== confirmPassword) return toast.error('Password and confirm password will be same');
        loginUser(email, password)
            .then(res => {
                console.log(res);
                setLoading(false);
                if (status === 'blocked') {
                    navigate('/');
                } else {
                    navigate('/dashboard/statistic');
                }
                return toast.success('User Login Successfully');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                return toast.error(err.message);
            });
    };
    return (
        <>
            <Helmet>
                <title>Login Page</title>
            </Helmet>
            <section className="flex items-center gap-3 min-h-screen p-10 bg-contain  bg-[url('https://i.ibb.co/m89PbFb/blood-background.png')]">
                <div className=" flex-1 h-full dark:bg-orange-800/50 p-6 rounded-xl  max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                            <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring" {...register("email", { required: true })} />
                            {errors.email && <span className="text-red-500">user email is required</span>}
                        </div>
                        <div className="relative">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                            <input id="password" type={show ? 'text' : "password"} className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring" {...register("password", { required: true })} />
                            {errors.password && <span className="text-red-500">Password is required</span>}
                            <span className="absolute top-[45px] right-3" onClick={() => setShow(!show)}>
                                {show ?
                                    <FaEye /> :
                                    <FaEyeSlash />
                                }
                            </span>
                        </div>
                        <div className="relative">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Password Confirmation</label>
                            <input id="passwordConfirmation" type={showPassword ? "text" : "password"} className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring" {...register("confirmPassword", { required: true })} />
                            {errors.confirmPassword && <span className="text-red-500">Confirm Password is required</span>}
                            <span className="absolute top-[45px] right-3" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <FaEye /> :
                                    <FaEyeSlash />
                                }
                            </span>
                        </div>
                        <div className=" mt-6">
                            {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                                <VscLoading className=" animate-spin" size={20} />
                            </button>
                                : <input className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md focus:outline-none focus:bg-sky-600" type="submit" value="Sign In" />}
                        </div>
                    </form>

                    <p className="text-center mt-2 text-white">New to the website, <Link className="underline hover:scale-110" to="/sign-up">Create an account</Link></p>
                </div>
            </section>
        </>
    );
};

export default Login;