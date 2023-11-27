import { FaAd, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils, FaVoicemail } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useDonationRequest from "../../hooks/useDonationRequest";




const Dashboard = () => {
     const [donationRequest] = useDonationRequest()
    const [isAdmin] = useAdmin()

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-teal-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/donationRequestManagement">
                                    <FaUtensils></FaUtensils>
                                    Donation Request Management</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/contentManagement">
                                    <FaList></FaList>
                                    Content Management</NavLink>
                            </li>
                           
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUser></FaUser>
                                    All Users</NavLink>
                            </li>

                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                               
                                <li>
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
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;