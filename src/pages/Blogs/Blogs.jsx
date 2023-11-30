import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Blogs = () => {
    const axiosPublic = useAxiosPublic()
    const { data: blogs = [], isPending: loading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs');
            return res.data;
        },
    });
    console.log(blogs)

    return (
        <div className="pt-20">
            <div>
                { loading? <span className="loading loading-spinner text-red-500"></span>
                :
                blogs.filter(filtered=>filtered.status==='published').map(blog=>
                <div key={blog._id} className="border-2 border-teal-400 my-10">

                    <img src={blog.image} className="w-full md:h-[400px]" alt="blog image" />
                    <h2 className="text-lg md:text-2xl font-semibold my-4 text-center bg-red-200 p-1 rounded-md md:w-[50%] mx-auto">{blog.title}</h2>
                    <p className="p-3"> {blog.content} </p>

                </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;