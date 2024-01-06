import ContactInfo from "../ContactUs/ContactInfo";
import ContactUs from "../ContactUs/ContactUs";
import Banner from "./Banner/Banner";
import FeaturedSection from "./FeaturedSection/FeaturedSection";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <div className="my-16 flex flex-col md:flex-row  justify-evenly">
                <div className="">
                    <ContactUs></ContactUs>

                </div>
                <div className="">
                    <ContactInfo></ContactInfo>

                </div>
            </div>
        </div>
    );
};

export default Home;