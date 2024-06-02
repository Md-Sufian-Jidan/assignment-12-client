import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllBanner = () => {
    const axiosSecure = useAxiosSecure();
    const { data: banners } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-banner')
            return data
        }
    })
    return (
        <div>
            <h2 className="text-3xl font-bold">Total Banner : {banners?.length}</h2>
            {
                banners?.map(banner => <div key={banner?._id} className="my-5">
                    <div className="hero h-[500px] my-5" style={{ backgroundImage: `url(${banner?.img_url})`}}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-2xl">
                                <h1 className="mb-5 text-5xl font-bold">{banner?.name}</h1>
                                <h1 className="mb-5 text-xl font-bold">{banner?.title}</h1>
                                <h1 className="mb-5 text-xl font-bold">Coupon Code : {banner?.couponCode}</h1>
                                <h1 className="mb-5 text-xl font-bold">Coupon Rate : <span className="font-semibold">{banner?.couponRate}</span></h1>
                                <p className="mb-5">{banner?.description}</p>
                                <button className="btn btn-outline bg-red-300">Add This To Home Page</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default AllBanner;