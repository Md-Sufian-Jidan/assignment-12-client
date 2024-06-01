import { SwiperSlide, Swiper } from 'swiper/react';
import "swiper/css";
import "swiper/css/bundle";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <div>
    <Swiper
        // slidesPerView={2}
        centeredSlides={true}
        spaceBetween={30}
        autoplay={{
            delay: 2000
        }}
        pagination={{
            type: 'fraction',
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        loop={true}>
        <SwiperSlide>
            <div className="h-[60vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/YRQKQK4/small-plant-near-various-cosmetics-bottles-1.jpg')]">
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-3xl font-bold">Welcome to Our Diagnostic Center!</h1>
                    <p className="mb-5">Get comprehensive diagnostics with our state-of-the-art facilities. Book your appointment today!</p>
                    <Link to="/all-queries" className="btn bg-[#5f3951] dark:bg-indigo-500 dark:text-white">All Queries</Link>
                </div>
            </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="h-[60vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/b2MNCbJ/jonathan-kemper-FV5d-B0c-Gu2-M-unsplash-1.jpg')]">
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="h-[60vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/Yfnb92T/oleg-guijinsky-2-CRg-KZAy-PXg-unsplash-1.jpg')]">
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="h-[60vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/PTTcdyM/yanapi-senaud-6-HR8vpj-YUHo-unsplash-1.jpg')]">
            </div>
        </SwiperSlide>
    </Swiper>

</div>
  );
}