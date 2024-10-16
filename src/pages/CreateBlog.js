import React, { useState } from 'react';
// import '../css/createBlog.css'; 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const CreateBlog = () => {
    const id = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        user: id
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
            console.log('Blog created:', formData);
            const res = await axios.post('/api/v1/blog/create-blog', formData)
            if (res.data?.success) {
                console.log(res.data)
                toast.success('blog creted successfully')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <>
            <div className="register-page">
                <h1>Create Blog</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>

                    {/* <div className="form-group">
                        <label>Gender:</label>
                        <div className="gender-options">
                            <label>
                                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female
                            </label>
                        </div>
                    </div> */}

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image:</label>
                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <button type="submit">Create Blog</button>
                </form>
            </div>
        </>
    )
}

export default CreateBlog