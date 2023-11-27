// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useDonationRequest = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const { user} = useAuth();
    console.log(user.email)
    const { refetch, data: donationRequest = [] } = useQuery({
        queryKey: ['donationRequest', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/donationRequests?email=${user.email}`);
            return res.data;
        }
    })
    console.log(donationRequest)

    return [donationRequest, refetch]
};

export default useDonationRequest;