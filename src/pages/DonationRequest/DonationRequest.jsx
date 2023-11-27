
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import useDonationRequestPublic from "../../hooks/useDonationRequestPublic";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";




const DonationRequest = () => {
    const [AllDonationRequest ,isLoading,refetch] = useDonationRequestPublic();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();


    return (
       
        
            <div>
                <div className="overflow-x-auto pt-24">
                    <div className="text-2xl font-bold text-center border-b-4 border-teal-400 p-2">
                        All Donation Request 
                    </div>
                    <table className="table w-full my-3">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    Requester Name</th>
                                <th>Location (Dist | Upz)</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>View</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading? <span className="loading loading-spinner text-secondary"></span>
                                :AllDonationRequest.map((info, index) => <tr key={info._id}>
                                <td>
                                    {info.reqName}
                                </td>
                                <td>
                                    {info.reciDistrict } | {info.reciUpazila}
                                </td>
                                
                                <td>
                                    {info.donationDate}
                                </td>
                                <td>
                                    {info.donationTime}
                                </td>
                               
                               
                                
                                <td>
                                <Link to={`/donationRequestDetails/${info._id}`}>
                                    <button className="btn btn-ghost btn-sm bg-slate-400">
                                        view
                                    </button></Link>
                            </td>
                            </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        
    );
};

export default DonationRequest;