import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';


import useAxiosPublic from '../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SearchPage = () => {

    const navigate = useNavigate()
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];



    const { register, handleSubmit, reset, formState } = useForm();

    const axiosPublic = useAxiosPublic();

    const { data: districts = [], isPending: loading, refetch } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/districts');
            return res.data;
        },
    });

    const { data: upazilas = [] } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upazilas');
            return res.data;
        },
    });

    const [selectedDistrict, setSelectedDistrict] = useState('default');
    const [selectedUpazila, setSelectedUpazila] = useState('default');
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








    };

    return (
        <div className="pt-24 pb-4  min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto mt-0 p-4 mb-10 rounded-lg bg-white">
                <div className="text-2xl font-bold md:w-[50%] w-full mx-auto text-center bg-red-200 p-2 rounded-md">Search Donors</div>
                <div className='flex flex-col  md:flex-row  gap-3 items-center justify-center'>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Blood Group*</span>
                            </label>
                            <select defaultValue="default" {...register('bloodGroup', { required: true })} className="select select-bordered w-full">
                                <option disabled value="default" >
                                    Select blood group
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
                    </div>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Upazila*</span>
                            </label>
                            <select {...register('upazila', { required: true })} onChange={(e) => setSelectedUpazila(e.target.value)} className="select select-bordered w-full">
                                <option value="default">
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
                                <span className="label-text">Email*</span>
                            </label>
                            <input type="text" placeholder="Email" {...register('email', { required: true })} required className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-md mt-10 bg-red-300 hover:bg-green-300 ">search</button>
                    </div>
                </div>

            </form>




            {/*  DISPLAY SEARCH DATA */}
            <div>
                {
                   
                }
            </div>

        </div>
    );
};

export default SearchPage;
