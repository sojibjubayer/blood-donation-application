import React from 'react';

const ContactInfo = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">Contact Information</h1>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Address:</span>  37/3,Purbodhola,Dhaka
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Phone:</span> +88 019 11101010
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Email:</span> bloodDonationApp@gmail.com
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Connect with Us</h2>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 transition duration-300"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-indigo-500 hover:text-indigo-700 transition duration-300"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-red-500 hover:text-red-700 transition duration-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
