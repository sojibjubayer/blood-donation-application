// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useDonationRequest = () => {
    const axiosPublic = useAxiosPublic()
    const { refetch, data: AllDonationRequest = [],isLoading } = useQuery({
        queryKey: ['donationRequest'],
        queryFn: async() => {
            const res = await axiosPublic.get('/AlldonationRequests');
            return res.data;
        }
    })
    

    return [AllDonationRequest,isLoading, refetch]
};

export default useDonationRequest;