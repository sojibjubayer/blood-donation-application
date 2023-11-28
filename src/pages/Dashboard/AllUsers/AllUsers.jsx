import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const AllUsers = () => {
    const axiosPublic = useAxiosPublic()


    const { refetch, data: allUsers = [], isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allUsers');
            return res.data;
        }
    })

    const handleActiveBlock = async ({ status, _id }) => {
        console.log(status)

        try {
            // Make your axios request with status and _id
            const response = await axiosPublic.patch(`/activeBlock/${_id}`, { status });
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: ` blocked now`,
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
                                allUsers?.filter(admin=>admin.email!=='jubayer@gmail.com').map((user, index) => <tr key={user._id}>

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
                                        <Link to={`/dashboard/updateuser/${user._id}`}>
                                            <button
                                                className="btn  btn-sm bg-orange-500">
                                                make volunteer
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updateuser/${user._id}`}>
                                            <button
                                                className="btn  btn-sm bg-green-500">
                                                make admin
                                            </button>
                                        </Link>
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