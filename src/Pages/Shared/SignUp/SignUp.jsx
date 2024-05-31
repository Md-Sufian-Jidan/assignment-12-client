import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const SignUp = () => {
    const { createUser } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // remember to use  react hook from
        // const name = data.name;
        // const email = data.email;
        // const password = data.password;
        // const image = data.image[0];
        // console.log(name, password, email, image);
        // const img_url = await imageUpload(image);
        // console.log(img_url);
        // createUser(email, password)
        //     .then((res) => {
        //         console.log(res.user);
        //         // TODO : save a user data in db
        //         const userInfo = {
        //             email: res?.user?.email,
        //             name: res?.user?.displayName,
        //         };

        //         axiosPublic.post('/users', userInfo)
        //             .then((res) => {
        //                 console.log(res.data);
        //             })
        //         updateUserProfile(name, img_url)
        //             .then((res) => {
        //                 console.log(res);
        //                 navigate('/'); // fix this before deploying your project
        //                 toast.success('User Created Successfully');
        //             })

        //             .catch(err => {
        //                 toast.error(`${err.message}`)
        //                 console.log(err);
        //             })
        //     })
    };

    return (
        <section className="flex items-center gap-3 min-h-screen p-10 bg-contain  bg-[url('https://i.ibb.co/m89PbFb/blood-background.png')]">
            <form onSubmit={handleSubmit} className="flex-1 h-full dark:bg-orange-800/50 p-6">
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
                <p className="text-center mt-2">All Ready Have an Account? <Link className="underline hover:scale-110" to="/login">Then Login</Link></p>
            </form>
            {/* <div>
                <img src="https://i.ibb.co/dcLrzpC/blood-login.png" alt="" />
            </div> */}
            <div className="lg:w-1/2">
                <img className="w-[500px] h-[360px]"  src="https://i.ibb.co/dcLrzpC/blood-login.png" alt="" />
            </div>
        </section>
    );
};

export default SignUp;