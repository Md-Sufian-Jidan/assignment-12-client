import { SwiperSlide, Swiper } from 'swiper/react';
import "swiper/css";
import "swiper/css/bundle";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Link } from 'react-router-dom';

export default function Banner() {
    return (
        <div className='my-5'>
            <Swiper
                // slidesPerView={2}
                centeredSlides={true}
                spaceBetween={30}
                autoplay={{
                    delay: 4000
                }}
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                loop={true}>
                <SwiperSlide>
                    <div className="h-[60vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/QMydnW5/coronavirus-test-assortment-lab.jpg')]">
                        <div className="hero-content text-center text-sky-700/90">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-3xl font-bold">Welcome to Our Diagnostic Center!</h1>
                                <p className="mb-5">Get comprehensive diagnostics with our state-of-the-art facilities. Book your appointment today!</p>
                                <Link to="/all-tests" className="btn bg-[#5f3951] dark:bg-sky-500/50 dark:text-white">All Tests</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-[60vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/rbQjPyP/side-view-doctor-writing-prescription.jpg')]">
                        <div className="hero-content text-center text-sky-700/90">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-3xl font-bold">Comprehensive Health Checkups</h1>
                                <p className="mb-5">Get thorough health assessments with our range of comprehensive tests designed to detect early signs of health issues.</p>
                                <Link to="/all-tests" className="btn bg-[#5f3951] dark:dark:bg-sky-500/50 dark:text-white">All Tests</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-[60vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/BnnYwgf/health-wellness-digital-tablet-concept.jpg')]">
                        <div className="hero-content text-center text-sky-700/90">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-3xl font-bold">Fast and Accurate Results</h1>
                                <p className="mb-5">Receive reliable and prompt test results. We ensure precision and speed to help you make informed health decisions.</p>
                                <Link to="/all-tests" className="btn bg-[#5f3951] dark:bg-indigo-500 dark:text-white">All Tests</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-[60vh] w-full bg-cover bg-no-repeat bg-center bg-[url('https://i.ibb.co/87Kv7Yz/hand-holding-blood-glucose-meter-measuring-blood-sugar-background-is-stethoscope-chart-file.jpg')]">
                        <div className="hero-content text-center text-sky-700/90">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-3xl font-bold">Special Discount for New Patients</h1>
                                <p className="mb-5">Join us today and enjoy a special 20% discount on all tests. Use code NEW20 at checkout and take the first step towards better health.</p>
                                <Link to="/all-tests" className="btn bg-[#5f3951] dark:bg-indigo-500 dark:text-white">All Tests</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
    );
}