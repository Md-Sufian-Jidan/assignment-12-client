import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogOut = () => {
        logout()
            .then(() => {
                toast.success('User logout successfully');
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            });
    };
    const navLinks = <>
        <li><NavLink to="/"><i>Home</i></NavLink></li>
        <li><NavLink to="all-reports"><i>All Reports</i></NavLink></li>
        <li><NavLink to="/dashboard" ><i>Dashboard</i></NavLink></li>
    </>
    return (
        <div className="navbar fixed max-w-7xl mx-auto bg-indigo-100 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">HealthScope
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        {/* <span>{user?.displayName}</span> */}
                        <button onClick={handleLogOut} className="btn  bg-red-400/60">Logout</button>
                    </> :
                        <Link className="btn bg-green-800/50" to="/login">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;