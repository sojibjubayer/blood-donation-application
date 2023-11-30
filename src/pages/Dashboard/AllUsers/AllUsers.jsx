import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
  
    const axiosSecure  =useAxiosSecure()
    const { user: adminUser } = useContext(AuthContext)

    const { refetch, data: allUsers = [], isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUsers');
            return res.data;
        }
    })

    const handleActiveBlock = async ({ status, _id }) => {
        console.log(status)

        try {

            const response = await axiosSecure.patch(`/activeBlock/${_id}`, { status });
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: ` status changed`,
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            }
        }
        catch (error) {
            console.error('Error:', error);

        }
    };
    const handleMakeVolunteer = async ({ role, _id }) => {
        try {

            const response = await axiosSecure.patch(`/makeVolunteer/${_id}`, { role });
            
            if (response.data.modifiedCount > 0) {
          
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `volunteer role added`,
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            }
        }
        catch (error) {
            console.error('Error:', error);

        }
    };


    const handleMakeAdmin = async ({ role, _id }) => {
        console.log(status)

        try {

            const response = await axiosSecure.patch(`/makeAdmin/${_id}`, { role });
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Admin role added`,
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            }
        }
        catch (error) {
            console.error('Error:', error);

        }
    };



    return (
        <div>

            <div>
                <div className="overflow-x-auto">
                    <div className="text-center text-2xl font-semibold border-b-4 border-teal-400 py-3">
                        Total Users:{allUsers?.length}
                    </div>
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>User Avater </th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Active/Block</th>
                                <th>Make Volunteer</th>
                                <th>Make Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers?.filter(me => me.email !== adminUser.email).map((user, index) => <tr key={user._id}>

                                    <td>
                                        <div className="flex users-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.status}
                                    </td>
                                    <td>

                                        <button
                                            className="btn btn-sm bg-slate-400"
                                            onClick={() => handleActiveBlock({ status: user.status === 'active' ? 'blocked' : 'active', _id: user._id })}
                                        >
                                            {user.status === 'active' ? 'block' : 'active'}
                                        </button>
                                    </td>
                                    <td>

                                        <button
                                            className="btn btn-sm bg-orange-400"
                                            onClick={() => handleMakeVolunteer({ role: 'volunteer', _id: user._id })}
                                            disabled={user.role === 'admin'}
                                        >
                                            {user.role === 'admin' ? 'Admin' : user.role === 'donor' ? 'Make Volunteer' : user.role === 'volunteer' ? 'Volunteer' : ''}
                                        </button>


                                    </td>
                                    <td>
                                    <button
                                            className="btn btn-sm bg-green-400"
                                            onClick={() => handleMakeAdmin({ role: 'admin',_id: user._id})}
                                            disabled={user.role === 'admin'}
                                        >
                                            {user.role === 'admin' ? 'admin' : 'Make admin'}
                                        </button>
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

export default AllUsers;