// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import BlogCard from '../components/BlogCard'

// const Blogs = () => {
//     const [blogs, setBlogs] = useState([])
//     const getAllBlogs = async () => {
//         try {
//             const { data } = await axios.get('/api/v1/blog/all-blog')
//             if (data?.success) {
//                 setBlogs(data?.blogs)
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     useEffect(() => {
//         getAllBlogs()
//     }, [])
//     return (
//         <>
//             {blogs && blogs.map((blog) =>
//             (<BlogCard
//                 id={blog?._id}
//                 isUser={false}
//                 title={blog?.title}
//                 description={blog?.description}
//                 image={blog?.image}
//                 name={blog?.user?.name}
//                 time={blog?.createdAt}

//             />))}
//         </>
//     )
// }

// export default Blogs


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import Loading from '../components/Loading'; // Import the Loading component
import NoBlogsMsg from '../components/NoBlogsMsg'; // Import the NoBlogsMessage component

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('/api/v1/blog/all-blog');
            if (data?.success) {
                setBlogs(data?.blogs);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    if (loading) {
        return <Loading />; // Render the loading component while data is being fetched
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {blogs.length ? (
                blogs.map((blog) => (
                    <BlogCard
                        key={blog?._id}
                        id={blog?._id}
                        isUser={false}
                        title={blog?.title}
                        description={blog?.description}
                        image={blog?.image}
                        name={blog?.user?.name}
                        time={blog?.createdAt}
                    />
                ))
            ) : (
                <NoBlogsMsg /> // Render the NoBlogsMessage component when no blogs are available
            )}
        </>
    );
};

export default Blogs;
