
import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import { Helmet } from "react-helmet-async";


const Main = () => {
    return (
        <div>
            {/* <Helmet> BDA | Home</Helmet> */}
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
           
        </div>
    );
};

export default Main;