import ContactInfo from "../ContactUs/ContactInfo";
import ContactUs from "../ContactUs/ContactUs";
import Banner from "./Banner/Banner";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="flex flex-col md:flex-row mt-10 border-2 border-teal-600">
                <div className="flex-1">
                    <ContactInfo></ContactInfo>
                </div>
                <div className="flex-1 ">
                    <ContactUs></ContactUs>
                </div>
            </div>
        </div>
    );
};

export default Home;