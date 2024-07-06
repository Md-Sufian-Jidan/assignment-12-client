import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const Contact = () => {
    return (
        <>
            {/* <div className="text-center mt-5">
            </div> */}
            <section className="bg-white dark:bg-gradient-to-t from-red-300 to-violet-300 my-5 rounded-xl">
                <div className="container px-6 py-12 mx-auto">
                    <div>
                        <p className="text-2xl font-semibold">Get in Touch with Us</p>
                        <p className="font-medium text-blue-500 dark:text-pink-400">Contact us</p>

                        <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Chat to our friendly team</h1>

                        <p className="mt-3 font-medium">We’d love to hear from you. Please fill out this form or shoot us an email.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                            <div>
                                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-indigo-200">
                                    <FaEnvelope />
                                </span>

                                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Email</h2>
                                <p className="mt-2 text-sm font-medium">Our friendly team is here to help.</p>
                                <p className="mt-2 text-sm text-lime-500 dark:text-lime-400">jidanjiyaj03@gmail.com</p>
                            </div>

                            <div>
                                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-indigo-200">
                                    <IoChatbubbleEllipsesOutline />
                                </span>

                                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Live chat</h2>
                                <p className="mt-2 text-sm font-medium">Our friendly team is here to help.</p>
                                <p className="mt-2 text-sm text-lime-500 dark:text-lime-400">Start new chat</p>
                            </div>

                            <div>
                                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-indigo-200">
                                    <FaLocationDot />
                                </span>

                                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Office</h2>
                                <p className="mt-2 text-sm font-medium">Come say hello at our office HQ.</p>
                                <p className="mt-2 text-sm text-lime-500 dark:text-lime-400">100 Smith Street Collingwood VIC 3066 AU</p>
                            </div>

                            <div>
                                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-indigo-200">
                                    <FaPhoneAlt />
                                </span>

                                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Phone</h2>
                                <p className="mt-2 text-sm font-medium">Mon-Fri from 8am to 5pm.</p>
                                <p className="mt-2 text-sm text-lime-500 dark:text-lime-400">+1 (555) 000-0000</p>
                            </div>
                        </div>

                        <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gradient-to-tr from-sky-300 to-purple-300 md:p-8">
                            <form>
                                <div className="-mx-2 md:items-center md:flex">
                                    <div className="flex-1 px-2">
                                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                                        <input type="text" placeholder="Name " className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-red-200/50 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div className="flex-1 px-2 mt-4 md:mt-0">
                                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
                                        <input type="text" placeholder="Last Name" className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-red-200/50 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                    <input type="email" placeholder="Type Your Email" className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-red-200/50 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div className="w-full mt-4">
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
                                    <textarea className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-red-200/50 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Message"></textarea>
                                </div>

                                <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-red-500/70 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Send message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;