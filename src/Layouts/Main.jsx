import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Helmet } from "react-helmet";

const Main = () => {
    return (
        <>
        <Helmet>
            <title>HealthScope | Home</title>
        </Helmet>
            <div className="max-w-7xl mx-auto">
                {/* navbar  */}
                <div className="h-20">
                    <Navbar />
                </div>
                {/* outlet  */}
                <Outlet />
                {/* footer  */}
                <Footer />
            </div>
        </>
    );
};

export default Main;