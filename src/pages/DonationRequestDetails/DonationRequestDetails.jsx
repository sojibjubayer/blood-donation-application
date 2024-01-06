import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const DonationRequestDetails = () => {
    const { _id, reqName, reqEmail, reciName, bloodGroup, reciDistrict, reciUpazila, hospitalName, fullAddress,
        donationDate, donationTime, requestMessage, donationStatus } = useLoaderData()
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()




    const handleProgress = async (event) => {
        event.preventDefault()
        console.log(event)
        const requestInfo = {
            donationStatus: 'inprogress',
            donorName:user.displayName,
            donorEmail:user.email
        };
        console.log(requestInfo)

        const infoRes = await axiosPublic.patch(`/confirmDonation/${_id}`, requestInfo);
        // console.log(infoRes.data)
        if (infoRes.data.modifiedCount > 0) {
          
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Donation Confirmed',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/donationRequest')

        }

    }
    return (
        <div>
            <div className='min-h-screen pt-24 md:w-[70%] mx-auto bg-teal-100 p-4'>
                <div className='text-xl font-bold text-center mb-3'>
                    Donation Request Details
                </div>

                <div className='flex flex-col md:flex-row gap-5 text-center'>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Requester Name</h4>
                        <p className='text-base md:ml-4'>{reqName}</p>
                    </div>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Requester Email</h4>
                        <p className='text-md md:ml-4'>{reqEmail}</p>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-5 text-center'>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Recipient Name</h4>
                        <p className='text-base md:ml-4'>{reciName}</p>
                    </div>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Blood Group</h4>
                        <p className='text-md md:ml-4'>{bloodGroup}</p>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-5 text-center'>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Recipient District</h4>
                        <p className='text-base md:ml-4'>{reciDistrict}</p>
                    </div>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Recipient Upazila</h4>
                        <p className='text-md md:ml-4'>{reciUpazila}</p>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-5 text-center'>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Hospital  Name</h4>
                        <p className='text-base md:ml-4'>{hospitalName}</p>
                    </div>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Full Address</h4>
                        <p className='text-md md:ml-4'>{fullAddress}</p>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-5 text-center'>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Donation Date</h4>
                        <p className='text-base md:ml-4'>{donationDate}</p>
                    </div>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Donation TIme</h4>
                        <p className='text-md md:ml-4'>{donationTime}</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-5 text-center'>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Request Message</h4>
                        <p className='text-base md:ml-4'>{requestMessage}</p>
                    </div>
                    <div className='flex-1'>
                        <h4 className='text-base bg-red-300 font-semibold p-1 '>Donation Status</h4>
                        <p className='text-md md:ml-4'>{donationStatus}</p>
                    </div>
                </div>

                <div className='flex justify-center items-center mt-7'>
                    <button className='btn bg-teal-400' onClick={() => document.getElementById('my_modal').showModal()}>Donate</button>
                </div>

                {/* MODAL  */}

                <dialog id="my_modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>


                        <div className="bg-teal-400">
                            <div className=" p-2 md:w-[70%] mx-auto">
                                <h2 className="text-xl md:text-2xl text-center my-3 border-b-2 font-bold">Confirm Requested Donation</h2>

                                <form onSubmit={handleProgress}>

                                    <div className="form-control ">
                                        <label className="label">
                                            <span className="label-text">Donor Name </span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="name" defaultValue={user?.displayName} className="w-full input input-bordered" readOnly />
                                        </label>
                                    </div>
                                    <div className="form-control ">
                                        <label className="label">
                                            <span className="label-text">Donor Email </span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="email" defaultValue={user?.email} className="w-full input input-bordered" readOnly />
                                        </label>
                                    </div>




                                    <button
                                        className="btn bg-teal-400 mt-5">
                                        <input type="submit" value="Confirm Donation"
                                            className="  font-semibold " />
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default DonationRequestDetails;