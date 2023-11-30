import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaCircle, FaDollarSign, FaUsers } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/admin-stats')
            return res.data;
        }
    });

    return (
        <div>
            <h2 className="text-3xl flex items-center gap-3">
                <span>Hi,Welcome </span>
                <div className='bg-red-200 p-2 text-2xl rounded-md'>
                    {
                        user?.displayName ? user.displayName : 'back'
                    }
                </div>
            </h2>

            <div className="stats shadow">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className='text-3xl'></FaUsers>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value"> {stats.users}</div>
                    
                </div>

               
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaCircle className='text-3xl'></FaCircle>
                    </div>
                    <div className="stat-title"> Total Request</div>
                    <div className="stat-value">{stats.totalRequest}</div>
                    
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <FaDollarSign className='text-3xl'></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-desc">$</div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;