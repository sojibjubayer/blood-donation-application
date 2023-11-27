// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useDonationRequest = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const { user} = useAuth();
    console.log(user?.email)
    const { refetch, data: AllDonationRequest = [],isLoading } = useQuery({
        queryKey: ['donationRequest', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get('/AlldonationRequests');
            return res.data;
        }
    })
    

    return [AllDonationRequest,isLoading, refetch]
};

export default useDonationRequest;