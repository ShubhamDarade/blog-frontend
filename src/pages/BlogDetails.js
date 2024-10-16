import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const BlogDetails = () => {
    const [blog, setBlog] = useState({})
    const id = useParams().id
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});


    useEffect(() => {
        const getBlogDetail = async () => {
            try {
                const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`)
                if (data?.success) {
                    setBlog(data?.blog)
                    setFormData({
                        title: data?.blog.title,
                        description: data?.blog.description,
                        image: data?.blog.image,
                    })
                }
            } catch (err) {
                console.log(err);
            }
        };

        getBlogDetail();
    }, [id]);




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
            const res = await axios.put(`/api/v1/blog/update-blog/${id}`, formData)
            if (res.data?.success) {
                console.log(res.data)
                toast.success('blog updated successfully')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    console.log(blog);
    return (
        <>
            <div className="register-page">
                <h1>Update Blog</h1>
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
                    <button type="submit">Update Blog</button>
                </form>
            </div>
        </>
    )
}

export default BlogDetails