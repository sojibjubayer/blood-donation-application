import { NavLink } from "react-router-dom";


const NotFound = () => {
    return (
        <div className="min-h-screen text-center mt-10">
            <p>404 :: page not found</p>
            <NavLink to='/'>goto  <span className="text-blue-500">Home</span></NavLink>
        </div>
    );
};

export default NotFound;