import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
    const { loginUser } = useAuth();
    // login a user
    const handleLogin = (e) => {
        e.preventDefault();
        // remember to use  react hook from
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        // loginUser(email, password)
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    };

    return (
        <section className="flex items-center gap-3 min-h-screen p-10 bg-contain  bg-[url('https://i.ibb.co/m89PbFb/blood-background.png')]">
            <form onSubmit={handleLogin} className="flex-1 h-full dark:bg-orange-800/50 p-6  max-w-3xl mx-auto">
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                        <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-00/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                        <input id="password" type="password" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-violet-700/70 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Password Confirmation</label>
                        <input id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2 text-violet-700/70 bg-white border border-gray-200 rounded-md dark:bg-indigo-200/30 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-green-300 focus:outline-none focus:ring" />
                    </div>
                </div>violet
                <div className="flex justify-center mt-6">
                    <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600">Sign In</button>
                </div>
                <p className="text-center mt-2">New to the website, <Link className="underline hover:scale-110" to="/sign-up">Create an account</Link></p>
            </form>
        </section>
    );
};

export default Login;