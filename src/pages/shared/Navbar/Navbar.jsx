import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

// import { FaShoppingCart } from 'react-icons/fa';
import useAdmin from "../../../hooks/useAdmin";
import logo from '../../../assets/logo1.png'
import { FaHome } from "react-icons/fa";
import useVolunteer from "../../../hooks/useVolunteer";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin()
    const [isVolunteer] = useVolunteer()
   


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><Link to="/donationRequest">Donation Request</Link></li>
        <li><Link to="/blogs">Blog</Link></li>
        {
            user && isAdmin && !isVolunteer && <li><Link to="/dashboard">Dashboard</Link></li>
        }
        {
            user && !isAdmin && isVolunteer && <li><Link to="/dashboard">Dashboard</Link></li>
        }
        {
            user &&  <li><Link to="/fundings">Fundings</Link></li>
        }
        {
            (user && !isAdmin && !isVolunteer) && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        }
        {
            !user && <li><Link to="/registration">Registration</Link></li>
        }


        {
            user ? <>
                {/* <span>{user?.displayName}</span> */}
                <button onClick={handleLogOut} className="">Logout</button>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }
    </>

    return (
        <>
            <div className="navbar fixed z-10  max-w-screen-xl bg-red-600 text-white border-b-4 border-[#00B3C7]">

                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact text-black border-b-2 border-white dropdown-content mt-3 p-2 shadow bg-teal-400 rounded-b-md w-52">
                        {navOptions}
                        </ul>
                    </div>
                    <div>
                       <Link to='/'> <img src={logo} className="w-[120px] rounded-md bg-teal-600 mr-2 hidden md:flex" alt="" /></Link>
                    </div>
                    <div className="flex flex-col ml-4">
                        <Link to="/">
                            <h3 className="flex items-center gap-1"><FaHome></FaHome> BDA</h3>
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
                    <a className="">{user?.displayName}</a>
                </div>
            </div>
        </>
    );
};

export default NavBar;