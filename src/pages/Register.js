import React, { useState } from 'react';
import '../css/register.css'; // Import the CSS file
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

function RegisterPage() {
    // const [formData, setFormData] = useState({
    //     name: '',
    //     gender: 'male',
    //     email: '',
    //     password: ''
    // });
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
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
            const res = await axios.post('/api/v1/user/register', formData)

            console.log(res);

            if (res.data?.success) {
                console.log(res.data)
                toast.success('user register successfully')
                navigate('/login')
            }





        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <div className="register-page">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Gender:</label>
                        <div className="gender-options">
                            <label>
                                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <div>
                    Already registered? <a href="/login">Sign in</a>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
