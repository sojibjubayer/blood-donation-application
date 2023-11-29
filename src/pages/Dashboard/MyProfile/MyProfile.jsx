import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";


const MyProfile = () => {
    const { user } = useAuth()
    console.log(user)
    const axiosPublic = useAxiosPublic()


    const { refetch, data: allUsers = [], isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allUsers');
            return res.data;
        }
    })


    return (
        <div>
            <div className="card w-96 mx-auto bg-base-100 shadow-xl">

                {
                    allUsers?.filter(filterUser => filterUser.email === user.email).map(user =>
                        <div key={user._id} className="card-body">
                            <div className="avatar">
                                <div className="w-24 mx-auto rounded">
                                    <img src={user.image} />
                                </div>
                            </div>
                            <h2 className="card-title">Name: {user.name}</h2>
                            <p>Email : {user.email}</p>
                            <p>District : {user.district}</p>
                            <p>Upazila : {user.upazila}</p>
                            <p>Blood Group : {user.bloodGroup}</p>
                            
                            <Link to={`/dashboard/updateProfile/${user._id}`}>
                                <button
                                    className="btn  btn-sm bg-orange-500">
                                    update profile
                                </button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyProfile;