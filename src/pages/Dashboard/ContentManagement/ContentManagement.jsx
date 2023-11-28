import { Link } from "react-router-dom";


const ContentManagement = () => {
    return (
        <div >
            <div className="bg-teal-500 p-3 -mt-5 flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-semibold">Content Management page</h2>
                <Link to='/dashboard/content-management/add-blog'>
                <button className="btn btn-md">ADD BLOG</button>
                </Link>
            </div>
        </div>
    );
};

export default ContentManagement;