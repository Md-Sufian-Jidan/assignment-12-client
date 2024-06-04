import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Recommendations = () => {
    const axiosSecure = useAxiosSecure();
    const { data: recommendations } = useQuery({
        queryKey: ['recommendations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/recommendations');
            console.log(res.data);
            return res.data;
        }
    })
    return (
        <div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    recommendations?.map(review => <SwiperSlide
                        key={review._id}>
                        <div className="flex flex-col items-center mx-24 my-16 text-lime-600/70 space-y-3">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="text-2xl">Test Recommendation : <span className="text-violet-400/80">{review.recommendationTitle}</span></p>
                            <h3 className="text-xl">Test Description : <span className="text-violet-400/80">{review?.description}</span></h3>
                            <h3 className="text-xl">Test Suggestion : <span className="text-violet-400/80">{review?.testSuggestion}</span></h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Recommendations;