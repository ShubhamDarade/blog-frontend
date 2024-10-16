import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import Loading from '../components/Loading';
import NoBlogsMsg from '../components/NoBlogsMsg'; // Import the NoBlogsMessage component

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');

            if (id) {
                const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
                console.log(data);
                if (data?.success) {
                    setBlogs(data?.userBlog.blogs);
                    setName(data?.userBlog?.name);
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {blogs.length ? (
                blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        name={name}
                        time={blog.createdAt}
                    />
                ))
            ) : (
                <NoBlogsMsg />
            )}
        </>
    );
};

export default MyBlogs;
