import { FaAd, FaCircle,  FaHome, FaList, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useDonationRequest from "../../hooks/useDonationRequest";
import useVolunteer from "../../hooks/useVolunteer";

import { IoMdMenu } from "react-icons/io";

const Dashboard = () => {
    const [donationRequest] = useDonationRequest()
    const [isAdmin] = useAdmin()
    const [isVolunteer] = useVolunteer()

    return (
        <div className="">
          
        <div className="flex flex-col md:flex-row">
                <div className="md:w-64 md:min-h-screen bg-teal-400  md:mt-0">
                    <ul className="menu p-4  ">
                        {
                           
                            isAdmin || isVolunteer ?<>
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
                                    <li >
                                        <NavLink to="/dashboard/createDonationRequest">
                                            <FaAd></FaAd>
                                            Create Donation Request</NavLink>
                                    </li>
                                </>
                        }
                        <div className="divider"></div>
                        {/* shared nav links  */}
                     
                        <div className="grid grid-cols-2 md:grid-cols-1">
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
                        </div>
                        

                    </ul>
                </div>
            
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;