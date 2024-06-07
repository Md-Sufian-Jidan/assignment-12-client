// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Skeleton from "../../../../Skeleton";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const AllTests = () => {
    // const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [tests, setTests] = useState();
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/all-tests?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setTests(data?.result)
                setCount(data?.count)
            })
    }, [currentPage, itemsPerPage]);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    console.log(pages);

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages?.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    };

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
                            type="date"
                            className="grow"
                            placeholder="Enter Date to search" />
                        {/* <button
                            onClick={getAllTests}
                            className="btn bg-gradient-to-bl from-green-400 to-sky-400">Search
                            </button> */}
                    </label>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5">
                    {
                        tests?.map(test => <div key={test?._id} className="card w-96 bg-gradient-to-bl from-cyan-300 to-fuchsia-500 shadow-xl mx-auto">
                            <figure className="px-10 pt-10">
                                <img src={test?.img_url} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body">
                                <h2 className="font-semibold">Test Name: <span className="">{test?.name}</span> </h2>
                                <p className="font-semibold">Test Category : {test?.testCategory}</p>
                                <p className="font-semibold">Start From : {new Date(test?.from).toDateString()}</p>
                                <div className="flex justify-end my-2">
                                    <Link to={`/test/details/${test?._id}`}>
                                        <button className="btn btn-outline btn-accent text-white">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
                <div className="text-center mx-auto my-3">
                    <button onClick={handlePreviousPage} className="btn hover:bg-gradient-to-br  from-gray-400 to-fuchsia-200"><FaArrowCircleLeft /></button>
                    {
                        pages?.map(page => <button
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? 'btn bg-gradient-to-tl from-fuchsia-300 to-emerald-200 mx-1' : 'btn mx-1 hover:bg-gradient-to-tl from-fuchsia-300 to-emerald-200'}
                            key={page}>{page + 1}</button>)
                    }
                    <button onClick={handleNextPage} className="btn hover:bg-gradient-to-br  from-violet-300 to-indigo-300"><FaArrowCircleRight /></button>
                </div>
            </div>
        </>
    );
};

export default AllTests;