import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Skeleton from "../../../../Skeleton";

const AllTests = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    // const [tests, setTests] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { data: tests } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const { data } = await axiosSecure(`${import.meta.env.VITE_API_URL}/all-tests`);
            return data;
        },
    });
    useEffect(() => {
        getAllTests();
    }, []);

    const getAllTests = async () => {
        const { data } = await axiosSecure(`${import.meta.env.VITE_API_URL}/all-tests?search=${search}`);
        return data;
    };
    console.log(tests);

    if (isLoading) return <Skeleton />;
    return (
        <>
            <Helmet>
                <title>HealthScope | All Test Page</title>
            </Helmet>
            <div>
                <div className="hero h-[500px] bg-cover my-3 rounded-xl" style={{ backgroundImage: 'url(https://i.ibb.co/mCb0x0b/medicine-student-doing-their-practice-hospital.jpg)' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-5xl">
                            <h1 className="mb-5 text-5xl font-bold">Comprehensive Diagnostic Tests</h1>
                            <p className="mb-5">Explore our extensive range of diagnostic tests designed to provide accurate and reliable results for your health needs. Whether you are checking your blood count, liver function, thyroid health, or cardiovascular risk, our tests cover a wide spectrum of medical conditions. Each test is performed using advanced technology to ensure the highest standards of care. Browse through our test catalog to find the right diagnostic services for you and schedule your appointments with ease. Your health and well-being are our top priorities.</p>
                        </div>
                    </div>
                </div>
                <form className="max-w-xl mx-auto my-7">
                    <label className="input input-bordered flex items-center gap-2 mx-10">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="text"
                            className="grow"
                            placeholder="Search" />
                        <span
                            onClick={getAllTests}
                            className="btn bg-gradient-to-bl from-green-400 to-sky-400">Search</span>
                    </label>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5">
                    {
                        tests?.map(test => <div key={test?._id} className="card w-96 bg-orange-100/50 shadow-xl mx-auto">
                            <figure className="px-10 pt-10">
                                <img src={test?.img_url} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body">
                                <h2 className="font-semibold">Test Name: <span className="">{test?.name}</span> </h2>
                                <p className="font-semibold">Test Category : {test?.testCategory}</p>
                                <div className="flex justify-end my-2">
                                    <Link to={`/test/details/${test?._id}`}>
                                        <button className="btn btn-outline btn-accent text-white">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default AllTests;