import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'




const Login = () => {
    
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state location of login page', location.state)

    

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
       
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate('/');
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Email or password does not match",
                    showConfirmButton: false,
                    timer: 1500
                  });
              
            })
    }



    return (
        <>
            <Helmet>
                <title>BDA | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-teal-600 pt-[77px]">
                <div className="hero-content flex-col ">

                    <div className="card  shadow-2xl bg-base-100 ">
                        <div className="text-center  mt-2">
                            <h1 className="text-2xl font-bold">Login </h1>
                        </div>
                        <form onSubmit={handleLogin} className="card-body md:w-[500px]" >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                          
                            <div className="form-control mt-6 ">
                                <input className="btn hover:bg-teal-400 hover:text-xl bg-teal-600 text-lg " type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='px-6 py-4 text-lg'><small>New Here? <Link to="/registration"><button>Please <span className='text-blue-700 font-semibold'>Register</span></button></Link> </small></p>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;