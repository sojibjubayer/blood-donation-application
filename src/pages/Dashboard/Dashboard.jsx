import { FaAd, FaCircle, FaEnvelope, FaHome, FaList, FaReact, FaShoppingCart, FaUser, FaUtensils, FaVoicemail } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useDonationRequest from "../../hooks/useDonationRequest";
import useVolunteer from "../../hooks/useVolunteer";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const Dashboard = () => {
    const [donationRequest] = useDonationRequest()
    const [isAdmin] = useAdmin()
    const [isVolunteer] = useVolunteer()
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="">
             {/* Button to toggle sidebar on mobile */}
             <button className="md:hidden" onClick={toggleSidebar}>
             <IoMdMenu />
            </button>
        <div className="flex">
           
            {/* dashboard side bar */}
            <div className={`${sidebarVisible ? 'block' : 'hidden md:block'}`}>
                <div className="w-64 md:min-h-screen bg-teal-400 md:static absolute  md:mt-0">
                    <ul className="menu p-4 ">
                        {
                            // isVolunteerLoading? <span className="loading loading-spinner text-red-500"></span>:
                            isAdmin || isVolunteer ? <>
                                <li>
                                    <NavLink to="/dashboard">
                                        <FaHome></FaHome>
                                        {isAdmin ? 'Admin Home' : 'Volunteer Home'}</NavLink>
                                </li>
                                <li className="my-2">
                                    <NavLink to="/dashboard/users">
                                        <FaUser></FaUser>
                                        All Users</NavLink>
                                </li>
                                <li className="my-3">
                                    <NavLink to="/dashboard/allDonationRequest">
                                        <FaCircle className="text-red-500"></FaCircle>
                                        All Blood Donation Request</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/contentManagement">
                                        <FaList></FaList>
                                        Content Management</NavLink>
                                </li>
                            </>

                                :

                                <>
                                    <li>
                                        <NavLink to="/dashboard/userHome">
                                            <FaHome></FaHome>
                                            User Home</NavLink>
                                    </li>

                                    <li className="my-3">
                                        <NavLink to="/dashboard/myDonationrequest">
                                            <FaShoppingCart></FaShoppingCart>
                                            My Donation Request ({donationRequest.length})</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/createDonationRequest">
                                            <FaAd></FaAd>
                                            Create Donation Request</NavLink>
                                    </li>



                                </>
                        }
                        <div className="divider"></div>
                        {/* shared nav links  */}
                     
                        <li>
                            <NavLink to="/dashboard/profile">
                                <FaUser></FaUser>
                                My Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                <FaHome></FaHome>
                                Home</NavLink>
                        </li>

                    </ul>
                </div>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;