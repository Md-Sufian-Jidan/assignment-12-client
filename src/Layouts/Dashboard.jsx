import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";
import useAuth from "../Hooks/useAuth";
import Skeleton from "../../Skeleton";

const Dashboard = () => {
    const { loading } = useAuth();
    if (loading) return <Skeleton />
    return (
        <div className="relative min-h-screen md:flex">
            <Sidebar />
            {/* dynamic content */}
            <div className="flex-1 md:ml-64">
                <div className="p-5">
                    <Outlet />
                </div>
            </div>


        </div>
    );
};

export default Dashboard;