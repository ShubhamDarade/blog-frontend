import React, { useState } from 'react';
import '../css/register.css'; // Import the CSS file
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../slices/authSlice'
import toast from 'react-hot-toast';

function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulating form submission, replace with your actual submission logic
            console.log('Form submitted:', formData);
            const { data } = await axios.post('/api/v1/user/login', formData)
            if (data.success) {
                console.log(data);
                localStorage.setItem('userId', data?.user._id)
                dispatch(login())

                toast.success('user login successfully')
                navigate('/')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <div className="register-page">
                <h1>Log in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div>
                    Don't have an account? <a href="/register">Register Here</a>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
