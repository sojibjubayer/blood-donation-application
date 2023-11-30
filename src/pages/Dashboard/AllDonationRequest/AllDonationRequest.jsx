import useDonationRequestPublic from "../../../hooks/useDonationRequestPublic";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import { useState } from "react";


const AllDonationRequest = () => {
    const [AllDonationRequest, refetch, isLoading] = useDonationRequestPublic();
    const [isAdmin] = useAdmin()
    const axiosSecure = useAxiosSecure();
     //filtering
     const [filterOption, setFilterOption] = useState('all'); // 'all', 'draft', 'published'
     const filteredDonations = AllDonationRequest.filter(donation => {
         if (filterOption === 'all') {
             return true; 
         } else {
             return donation.donationStatus === filterOption; 
         }
     });

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
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `deleted sucessfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    

                }


            }
        });
    }
    const handleStatusChange = async ({ status, _id }) => {
        console.log(status);
        try {
          const response = await axiosSecure.patch(`/doneCancel/${_id}`, { status });
      
          // Check if the update was successful based on the server response
          if (response.data && response.data.modifiedCount>0) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'status changed',
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          } else {
            console.log('Update was not successful:', response.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (


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
                        <th>Location (Dist | Upz)</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>
                            <label htmlFor="filterOption">Filter:</label>
                            <select
                                id="filterOption"
                                className=""
                                value={filterOption}
                                onChange={(e) => setFilterOption(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="pending">pending</option>
                                <option value="inprogress">inprogress</option>
                                <option value="done">done</option>
                                <option value="cancel">cancel</option>
                            </select>
                        </th>
                        <th>Donor Info</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        filteredDonations?.map((info, index) => <tr key={info._id}>
                            <td>
                                {info.reciName}
                            </td>
                            <td>
                                {info.reciDistrict} | {info.reciUpazila}
                            </td>

                            <td>
                                {info.donationDate}
                            </td>
                            <td>
                                {info.donationTime}
                            </td>
                            <td>
                                {info.donationStatus === 'inprogress' ? (
                                    <>
                                        {/* <span>{info.donationStatus}</span> */}
                                        <select
                                            onChange={(e) => handleStatusChange({ status: e.target.value, _id: info._id })}
                                            value=""
                                            style={{ marginLeft: '5px' }}
                                        >
                                            <option value="" disabled>{info.donationStatus}</option>
                                            <option value="cancel">Cancel</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </>
                                ) : (
                                    <span className={`${info.donationStatus==='done'?'bg-green-300 rounded-sm px-1':info.donationStatus==='cancel'?'bg-red-300 rounded-sm px-1':'bg-yellow-300 rounded-sm px-1'}`}>{info.donationStatus}</span>
                                )}
                            </td>
                            <td>
                                {info.donationStatus==='inprogress'?`${info.donorName}   ${info.donorEmail}` :''}
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
                                <Link to={`/donationRequestDetails/${info._id}`}>
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

    );
};

export default AllDonationRequest;
