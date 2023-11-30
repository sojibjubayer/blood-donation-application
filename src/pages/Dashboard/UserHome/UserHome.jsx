import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useDonationRequest from "../../../hooks/useDonationRequest";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const UserHome = () => {
    const { user } = useAuth()
    const [donationRequest, refetch] = useDonationRequest();
    const axiosPublic = useAxiosPublic();




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
                const res = await axiosPublic.delete(`/donationRequest/${info._id}`);
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


    const handleStatusChange = async ({ status, _id }) => {
        console.log(status);
        try {
            const response = await axiosPublic.patch(`/doneCancel/${_id}`, { status });

            // Check if the update was successful based on the server response
            if (response.data && response.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Volunteer role added',
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
            } else {
                // Handle other cases where the update was not successful
                console.log('Update was not successful:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi,Welcome </span>
                {
                    user?.displayName ? user.displayName : 'back'
                }

            </h2>
            {
                donationRequest?.length > 0 ?
                    <div className="overflow-x-auto">
                        <div className="text-2xl font-bold text-center border-b-4 border-teal-400 p-2">
                            My Donation Request
                        </div>
                        <table className="table w-full pt-8">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        Recipient Name
                                    </th>
                                    <th>Location (Dist | Upz)</th>
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
                                    donationRequest?.slice(-3).map((info, index) => <tr key={info._id}>
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
                                                <span className={`${info.donationStatus === 'done' ? 'bg-green-300 rounded-sm px-1' : info.donationStatus === 'cancel' ? 'bg-red-300 rounded-sm px-1' : 'bg-yellow-300 rounded-sm px-1'}`}>{info.donationStatus}</span>
                                            )}
                                        </td>
                                        <td>
                                            {info.donationStatus === 'inprogress' ? `${info.donorName}   ${info.donorEmail}` : ''}
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


                        </table >
                        <div className="flex justify-center mt-4">
                            <Link to='/dashboard/mydonationRequest'>
                                <button className="btn btn-sm md:btn-md bg-teal-300">view my all request</button>
                            </Link>
                        </div>
                    </div>
                    : ''
            }
        </div>
    );
};

export default UserHome;