import { useForm } from "react-hook-form";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import SocialLogin from "../components/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    // FOR PASSWORD MATCH 
    const schema = yup.object().shape({
        // ... other validation rules
        password: yup.string().required("Password is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });


    const { register, handleSubmit, reset, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const districts = [
        { value: 'district1', label: 'District 1' },
        { value: 'district2', label: 'District 2' },
        { value: 'district3', label: 'District 3' },
        // Add more districts as needed
    ];

    const upazilas = [
        { value: 'upazila1', label: 'Upazila 1' },
        { value: 'upazila2', label: 'Upazila 2' },
        { value: 'upazila3', label: 'Upazila 3' },
        // Add more upazilas as needed
    ];






    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // 
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };




    return (
        <div className=" pt-24 pb-4  bg-teal-600">
            <form onSubmit={handleSubmit(onSubmit)} className=" md:w-[38%] mx-auto mt-0 p-4 mb-10 rounded-lg bg-white">
                <div className="text-2xl font-bold text-center">
                    Register
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Name*</span>
                    </label>
                    <input
                        type="text"
                        placeholder=" Name"
                        {...register('name', { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Email*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Email"
                        {...register('email', { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>


                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Blood Group*</span>
                    </label>
                    <select
                        defaultValue="default"
                        {...register('bloodGroup', { required: true })}
                        className="select select-bordered w-full"
                    >
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
                    <select
                        defaultValue="default"
                        {...register('district', { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option disabled value="default">
                            Select a district
                        </option>
                        {districts.map((district) => (
                            <option key={district.value} value={district.value}>
                                {district.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Upazila*</span>
                    </label>
                    <select
                        defaultValue="default"
                        {...register('upazila', { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option disabled value="default">
                            Select an upazila
                        </option>
                        {upazilas.map((upazila) => (
                            <option key={upazila.value} value={upazila.value}>
                                {upazila.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Password */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Password*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                        className={`input input-bordered w-full ${formState.errors.password ? "input-error" : ""
                            }`}
                    />
                    {formState.errors.password && (
                        <p className="text-error">{formState.errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Confirm Password*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register('confirmPassword')}
                        className={`input input-bordered w-full ${formState.errors.confirmPassword ? "input-error" : ""
                            }`}
                    />
                    {formState.errors.confirmPassword && (
                        <p className="text-error">
                            {formState.errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <div className="form-control w-full my-6">
                <label className="label">
                        <span className="label-text">Add Your Image*</span>
                    </label>
                    <input
                        {...register('image', { required: true })}
                        type="file"
                        className="file-input w-full max-w-xs"
                    />
                </div>

                <button className="btn w-full bg-teal-600 font-bold text-xl text-orange-300 hover:text-black hover:bg-teal-600">
                    Register 
                </button>
                <p className='px-6'><small>Already Registered? <Link to="/login"> Login Here</Link> </small></p>
                        <SocialLogin></SocialLogin>
            </form>
        </div>
    );
};

export default Register;