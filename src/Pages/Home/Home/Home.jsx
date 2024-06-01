import { Helmet } from "react-helmet";
import Banner from "../../../Components/Banner/Banner";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>HealthScope | Home</title>
            </Helmet>
            <div>
                <Banner />
            </div>
        </>
    );
};

export default Home;