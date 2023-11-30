

import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import { clear } from 'localforage';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';




const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);


    const { register, handleSubmit, reset, formState } = useForm();

  
    const axiosSecure = useAxiosSecure();
    const {  data: allUsers = [], isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUsers');
            return res.data;
        }
    })

    const dbUser=allUsers?.filter(filtered=>filtered.email===user.email)
    const status=dbUser[0]?.status;
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  

        // GETTING DISTRICT AND UPAZILA 
    const { data: districts = [] } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/districts');
            return res.data;
        },
    });

    const { data: upazilas = [] } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const res = await axiosSecure.get('/upazilas');
            return res.data;
        },
    });



    const [selectedDistrict, setSelectedDistrict] = useState('default');
    const [filteredUpazilas, setFilteredUpazilas] = useState(upazilas);
    const [selectedDistrictName, setSelectedDistrictName] = useState('');

   

    useEffect(() => {
        if (selectedDistrict !== 'default') {
          const districtObj = districts.find((district) => district.id === selectedDistrict);
          setSelectedDistrictName(districtObj ? districtObj.name : '');
        }
      }, [selectedDistrict, districts]);
      
      useEffect(() => {
        if (selectedDistrict !== 'default') {
          const filtered = upazilas.filter((upazila) => upazila.district_id === selectedDistrict);
          setFilteredUpazilas(filtered);
        } else {
          setFilteredUpazilas(upazilas);
        }
      }, [selectedDistrict, upazilas]);
  

    const onSubmit = async (data) => {
    
        const selectedUpazilaObj = filteredUpazilas.find((upazila) => upazila.id === data.upazila);
        const selectedUpazilaName = selectedUpazilaObj ? selectedUpazilaObj.name : '';

            const requestInfo = {
                reqName: data.requesterName,
                reqEmail: data.requesterEmail,
                reciName: data.recipientName,
                bloodGroup: data.bloodGroup,
                reciDistrict: selectedDistrictName,
                reciUpazila: selectedUpazilaName,
                hospitalName: data.hospitalName,
                fullAddress: data.fullAddress,
                donationDate: data.donationDate,
                donationTime: data.donationTime,
                requestMessage: data.requestMessage,
                donationStatus: 'pending',
               
            };
            console.log(requestInfo)

            const requestInfoRes = await axiosSecure.post('/donationRequest', requestInfo);

            if (requestInfoRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Donation Request Successful',
                    showConfirmButton: false,
                    timer: 1500,
                });
                window.location.reload()
                clear()
            }
        
    };

    return (
        <div className=" p3-4 bg-teal-600">
            
             {
                status!=='blocked'? <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto mt-0 p-4 mb-10 rounded-lg bg-white">
                <div className="text-2xl font-bold text-center border-b-4 border-teal-400">Create Donation Request</div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Requester Name*</span>
                    </label>
                    <input type="text" defaultValue={user?.displayName} {...register('requesterName', { required: true })} required className="input input-bordered w-full" readOnly  />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Requester Email*</span>
                    </label>
                    <input type="text" defaultValue={user?.email} {...register('requesterEmail', { required: true })} required className="input input-bordered w-full" readOnly />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Recipient Name</span>
                    </label>
                    <input type="text" placeholder="Recipient Name" {...register('recipientName', { required: true })} required className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Recipient Blood Group*</span>
                    </label>
                    <select defaultValue="default" {...register('bloodGroup', { required: true })} className="select select-bordered w-full">
                        <option disabled value="default">
                            Select a blood group
                        </option>
                        {bloodGroups.map((group) => (
                            <option key={group} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">District*</span>
                    </label>
                    <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="select select-bordered w-full">
                        <option disabled value="default">
                            Select a district
                        </option>
                        {districts.map((district) => (
                            <option key={district._id} value={district.id}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Upazila*</span>
                    </label>
                    <select {...register('upazila', { required: true })} className="select select-bordered w-full">
                        <option  value="default">
                            Select an upazila
                        </option>
                        {filteredUpazilas.map((upazila) => (
                            <option key={upazila._id} value={upazila.id}>
                                {upazila.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Hospital Name</span>
                    </label>
                    <input type="text" placeholder="Recipient Name" {...register('hospitalName', { required: true })} required className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Full Address </span>
                    </label>
                    <input type="text" placeholder="Recipient Name" {...register('fullAddress', { required: true })} required className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Donation Date </span>
                    </label>
                    <input type="date" placeholder="Recipient Name" {...register('donationDate', { required: true })} required className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Donation Time </span>
                    </label>
                    <input type="time" placeholder="Recipient Name" {...register('donationTime', { required: true })} required className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Request Message</span>
                    </label>
                    <input type="text" placeholder="Recipient Name" {...register('requestMessage', { required: true })} required className="input input-bordered w-full" />
                </div>
             
             
               
                <button className="btn w-full bg-teal-600 font-bold text-xl text-orange-300 hover:text-black hover:bg-teal-600">Request Donation</button>

              
            </form>
            :''
             }
         
        </div>
    );
};

export default CreateDonationRequest;
