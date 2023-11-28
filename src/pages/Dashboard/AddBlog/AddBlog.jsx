import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAxiosPublic from '../../../hooks/useAxiosPublic';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {

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
        
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        
        const selectedUpazilaObj = filteredUpazilas.find((upazila) => upazila.id === data.upazila);
       const selectedUpazilaName = selectedUpazilaObj ? selectedUpazilaObj.name : '';
    

        if (res.data.success) {
            
            const user = {
                name: data.name,
                email: data.email,
                bloodGroup: data.bloodGroup,
                district: selectedDistrictName,
                upazila: selectedUpazilaName,
                status: 'active',
                image: res.data.data.display_url,
                role: 'donor'
            };
            console.log(user)

            const userRes = await axiosPublic.post('/users', user);

            if (userRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registration Successfull',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/')
            }
        }
    };

    return (
        <div className=" bg-teal-600">
            <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto mt-0 p-4 mb-10 rounded-lg bg-white">
                <div className="text-2xl font-bold text-center">Add Your Blog</div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Title*</span>
                    </label>
                    <input type="text" placeholder="Titile of the blog" {...register('title', { required: true })} required className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Add Thumbnail Image*</span>
                    </label>
                    <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                </div>


                
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Content*</span>
                    </label>
                    <input type="text" placeholder="blog content" {...register('content', { required: true })} required className="input input-bordered w-full" />
                </div>
              
               
              
              
                
                <button className="btn w-full bg-teal-600 font-bold text-xl text-orange-300 hover:text-black hover:bg-teal-600">Create Blog</button>
                
                
            </form>
        </div>
    );
};

export default AddBlog;
