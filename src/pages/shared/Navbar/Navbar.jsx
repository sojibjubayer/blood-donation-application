import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

// import { FaShoppingCart } from 'react-icons/fa';
import useAdmin from "../../../hooks/useAdmin";
import logo from '../../../assets/logo1.png'

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin()

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><Link to="/donationRequest">Donation Request</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard">Dashboard</Link></li>
        }
        <li><Link to="/registration">Registration</Link></li>


        {
            user ? <>
                {/* <span>{user?.displayName}</span> */}
                <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }
    </>

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-90 max-w-screen-xl bg-red-600 text-white border-b-4 border-[#00B3C7]">

                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <div>
                        <img src={logo} className="w-[120px] rounded-md bg-teal-600 mr-2 hidden md:flex" alt="" />
                    </div>
                    <div className="flex flex-col ml-4">
                        <Link to="/">
                            <h3 className="">BDA</h3>
                            <h4 className="hidden md:flex">Blood Donation Application</h4>
                        </Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">logo</a>
                </div>
            </div>
        </>
    );
};

export default NavBar;