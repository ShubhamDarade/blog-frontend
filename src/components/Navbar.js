import React from 'react';
import { Link } from 'react-router-dom'; // if using React Router
import '../css/navbar.css'; // Import the CSS file
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let islogin = useSelector((state) => state.auth.value)
    islogin = islogin || localStorage.getItem('userId')
    const handleLogout = () => {
        try {
            dispatch(logout())
            localStorage.clear()
            toast.success('user logout successfully')
            navigate('/login')
        } catch (err) {
            console.log(err);
        }
    }
    // console.log(islogin);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to="/dashboard">Dashboard</Link>
                </div>


                <div className="navbar-center">
                    <Link to="/blogs">All Blogs</Link>
                    {
                        islogin && <>
                            <Link to="/my-blogs">My Blogs</Link>
                            <Link to="/like-blogs">Like Blogs</Link>
                            <Link to="/create-blog">Create Blog</Link>
                        </>
                    }
                </div>



                <div className="navbar-right">
                    {
                        islogin && <> <button onClick={handleLogout}>Logout</button> </>
                    }
                    {
                        !islogin && <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    }
                </div>
            </nav>
        </>
    );
};

export default Navbar;
