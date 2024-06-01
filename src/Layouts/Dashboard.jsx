import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
    return (
        <div>
            <Sidebar />
            {/* dynamic content */}
            <div>
                <Outlet />
            </div>

        </div>
    );
};

export default Dashboard;