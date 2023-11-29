
import { Link } from 'react-router-dom';
import bannerImage from '../../../assets/banner.jpg'
const Banner = () => {
  return (
    <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="absolute inset-0 bg-[#00B3C7] opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center bg-red-600 opacity-80 p-4">
          <h1 className="text-4xl font-bold mb-4">Donate blood, save lives.</h1>
          <div className="flex flex-col ">
            <button className="bg-[#00B3C7]  text-2xl font-semibold text-white rounded-md p-1"><Link to='/registration'>Join as a donor</Link></button>
            <button className="bg-[#00B3C7]  text-2xl font-semibold mt-4 text-white rounded-md p-1">
            <Link to='/searchDonors'>Search donors</Link> </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
