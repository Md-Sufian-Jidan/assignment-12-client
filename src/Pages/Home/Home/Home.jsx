import { Helmet } from "react-helmet";
import Banner from "../../../Components/Banner/Banner";
import Cover from "./Cover";
import Faq from "./Faq";
import Recommendations from "./Recommendations";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>HealthScope | Home</title>
            </Helmet>
            <div>
                <Banner />
                <div className="my-10 max-w-3xl mx-auto text-center space-y-2">
                    <h2 className="lg:text-3xl md:text-2xl text-xl font-bold">Discover Our Exclusive Health Packages</h2>
                    <p>Explore our tailored health packages designed to meet your specific needs. Take advantage of our seasonal discounts and start your journey towards better health today. Whether it is a comprehensive health check-up or a specialized diagnostic test, our expert team is here to provide you with the best care. Do not miss out on our limited-time offers and special coupon codes for additional savings!</p>
                </div>
                <Cover />
                <Recommendations />
                <Faq />
            </div>
        </>
    );
};

export default Home;