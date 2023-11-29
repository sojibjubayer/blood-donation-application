import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import useAdmin from "../../../hooks/useAdmin";


const ContentManagement = () => {
    const [isAdmin] = useAdmin()
    const axiosPublic = useAxiosPublic()

    const { data: blogs = [], isPending: loading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs');
            return res.data;
        },
    });

    const [filterOption, setFilterOption] = useState('all'); // 'all', 'draft', 'published'
    const filteredBlogs = blogs.filter(blog => {
        if (filterOption === 'all') {
            return true; 
        } else {
            return blog.status === filterOption; 
        }
    });

    
    const handleDeleteBlog = (id) => {
        console.log(id)
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
                const res = await axiosPublic.delete(`/deleteBlog/${id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: ' Blog been deleted',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }
    const handlePublish = async ({ status, _id }) => {
        console.log(status)

        try {

            const response = await axiosPublic.patch(`/publishPost/${_id}`, { status });
            console.log(response.data);
            if (response.data.modifiedCount > 0) {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: ` successfully updated status`,
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
        <div >
            <div className="bg-teal-500 p-3 -mt-5 flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-semibold">Content Management page</h2>
                <Link to='/dashboard/content-management/add-blog'>
                    <button className="btn btn-md">ADD BLOG</button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr className="text-base">
                            <th>Blog Title</th>
                            <th>Blog</th>
                            {isAdmin&&(
                            <th>Delete Blog</th>)}
                            {isAdmin&&(<th>Publish</th>)}
                            <th>
                                <label htmlFor="filterOption">Filter:</label>
                                <select
                                    id="filterOption"
                                    className="ml-2 mb-3 p-1"
                                    value={filterOption}
                                    onChange={(e) => setFilterOption(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            //  isLoading? <span className="loading loading-spinner text-secondary"></span>
                            //  :
                            filteredBlogs.map((blog, index) => <tr key={blog._id}>
                                <td>
                                    {blog.title}
                                </td>
                                <td>
                                    {blog.content}
                                </td>

                                {isAdmin&&(
                                <td>
                                    <button
                                        onClick={() => handleDeleteBlog(blog._id)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>)}

                                {isAdmin&&(
                                <td>
                                    <button
                                        className={`btn btn-sm ${blog.status === 'draft' ? 'bg-green-400' : 'bg-red-400'}`}
                                        onClick={() => handlePublish({ status: blog.status === 'draft' ? 'published' : 'draft', _id: blog._id })}
                                    >
                                        {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
                                    </button>
                                </td>)}

                            </tr>)

                        }
                    </tbody>


                </table>
                </div>
            </div>
    );
};

export default ContentManagement;