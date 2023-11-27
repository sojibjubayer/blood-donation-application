
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

import useDonationRequest from "../../../hooks/useDonationRequest";


const MyDonationRequest = () => {
    const [donationRequest ,refetch] = useDonationRequest();
    const axiosSecure = useAxiosSecure();

    const handleDeleteinfo = (info) => {
        console.log(info)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/donationRequest/${info._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${info.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }

    return (
        <div>
        
            <div>
                <div className="overflow-x-auto">
                    <div className="text-2xl font-bold text-center border-b-4 border-teal-400 p-2">
                        My Donation Request 
                    </div>
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    Recipient Name
                                </th>
                                <th>Location(DIst | Upz)</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Donation Status</th>
                                <th>Donor Info</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>View</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                donationRequest.map((info, index) => <tr key={info._id}>
                                    <td>
                                        {info.reciName}
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
                                        {info.donationStatus}
                                    </td>
                                    <td>
                                        #
                                    </td>
                                   
                                    <td>
                                    <Link to={`/dashboard/editInfo/${info._id}`}>
                                            <button
                                                className="btn btn-ghost btn-lg bg-orange-500">
                                                <FaEdit className="text-white 
                                        "></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteinfo(info)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                    <td>
                                        <Link to='/viewDetails'>
                                        <button className="btn btn-ghost btn-sm">
                                            view
                                        </button></Link>
                                    </td>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyDonationRequest;