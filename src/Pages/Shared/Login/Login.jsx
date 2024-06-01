import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
// import { FaGithub, FaGoogle } from "react-icons/fa";

const Login = () => {
    // googleLoginUser, githubLoginUser 
    const { loginUser } = useAuth();
    // custom state
    const [disabled, setDisabled] = useState(true);
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    // login a user
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    // validate recaptcha
    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    };

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        if (password.length < 6) {
            return toast.error('Your password should at least 6 character long');
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error('Your password should contain a Capital letter')
        }
        if (!/[a-z]/.test(password)) {
            return toast.error('Your password should contain a lower letter')
        }
        if (password !== confirmPassword) return toast.error('Password and confirm password will be same');

        loginUser(email, password)
            .then(res => {
                console.log(res.data);
                navigate('/');
                return toast.success('User Login Successfully');
            })
            .catch(err => {
                console.log(err);
                navigate('/')
                return toast.error(err.message);
            });
    };
    // // google login
    // const handleGoogle = () => {
    //     googleLoginUser()
    //         .then(res => {
    //             console.log(res.data);
    //             navigate('/');
    //             return toast.success('User Login Successfully');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             navigate('/');
    //             return toast.error(err.message);
    //         })
    // }
    // // github login
    // const handleGithub = () => {
    //     githubLoginUser()
    //         .then(res => {
    //             console.log(res.data);
    //             navigate('/');
    //             return toast.success('User Login Successfully');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             navigate('/');
    //             return toast.error(err.message);
    //         })
    // };

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
                        <div className="">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <span>Type The above captcha</span>
                            <input onBlur={handleValidateCaptcha} type="text" name="captcha" className="block w-full px-4 py-2 mt-2 text-white bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring" />
                        </div>
                        <div className=" mt-6">
                            <input disabled={disabled} className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md focus:outline-none focus:bg-sky-600" type="submit" value="Sign In" />
                        </div>
                        {/* social login  */}
                    </form>
                    {/* <div className="divider ">or login with social account</div>
                <div className="flex flex-col gap-3 mt-3">
                    <button onClick={handleGoogle} className="btn btn-success text-xl"> <FaGoogle /> Google</button>
                    <button onClick={handleGithub} className="btn btn-neutral text-xl"><FaGithub /> Github</button>
                </div> */}
                    <p className="text-center mt-2 text-white">New to the website, <Link className="underline hover:scale-110" to="/sign-up">Create an account</Link></p>
                </div>
            </section>
        </>
    );
};

export default Login;