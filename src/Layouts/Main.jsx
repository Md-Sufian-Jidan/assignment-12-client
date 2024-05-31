import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div>
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