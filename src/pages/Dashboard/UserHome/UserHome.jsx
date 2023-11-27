import useAuth from "../../../hooks/useAuth";


const UserHome = () => {
    const { user } = useAuth()
    console.log(user)
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi,Welcome </span>
                    {
                        user?.displayName? user.displayName:'back'
                    }
                
            </h2>
        </div>
    );
};

export default UserHome;