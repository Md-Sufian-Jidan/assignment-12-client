import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
    const { user, logout } = useAuth();
    console.log(user);
    const [isAdmin] = useAdmin();
    console.log(isAdmin);

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
        <NavLink className={({ isActive }) => isActive ? "p-3 border-0 border-b-2 border-b-pink-500 mr-2 font-bold" : "p-3 mr-2"} to="/"><i>Home</i></NavLink>
        <NavLink className={({ isActive }) => isActive ? "p-3 border-0 border-b-2 border-b-pink-500 mr-2 font-bold" : "p-3 mr-2"} to="all-tests"><i>All Tests</i></NavLink>
        <NavLink className={({ isActive }) => isActive ? "p-3 border-0 border-b-2 border-b-pink-500 mr-2 font-bold" : "p-3 mr-2"} to={`${isAdmin ? "/dashboard/statistic" : "dashboard/user-statistics"}`} ><i>{isAdmin ? 'Admin Dashboard' : 'User Dashboard'}</i></NavLink>
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
                {user && <div title={user?.email} tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-2">
                    <div className="w-16 rounded-full">
                        <img alt="Profile picture" src={user?.photoURL} />
                    </div>
                </div>}
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