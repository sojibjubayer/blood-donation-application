import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import useAxiosPublic from '../../../hooks/useAxiosPublic';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState } = useForm();

    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        

        if (res.data.success) {
            
            const blog = {
                title: data.title,
                image: res.data.data.display_url,
                content: data.content,
                status: 'draft',
              
            };
        

            const userRes = await axiosPublic.post('/blogPost', blog);

            if (userRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Blog Posted Sucessfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/dashboard/contentManagement')
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
                    <textarea  placeholder="blog content" {...register('content', { required: true })} required className="input input-bordered w-full" />
                </div>
              
               
              
              
                
                <button className="btn w-full bg-teal-600 font-bold text-xl text-orange-300 hover:text-black hover:bg-teal-600">Create Blog</button>
                
                
            </form>
        </div>
    );
};

export default AddBlog;
