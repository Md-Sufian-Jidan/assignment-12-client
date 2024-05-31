import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* navbar  */}
            <Navbar />
            {/* outlet  */}
            outlet
            {/* footer  */}
            footer
        </div>
    );
};

export default Main;