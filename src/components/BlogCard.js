import React from 'react'
import '../css/blogCard.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogCard = (props) => {
    const navigate = useNavigate()
    let islogin = localStorage.getItem('userId')
    const { title, time, name, image, description, id, isUser } = props
    const handleLike = async (e) => {
        e.preventDefault();
        try {
            console.log(`like blog : ${id}`);
            console.log(`user id is : ${islogin}`);
            const res = await axios.put(`/api/v1/user/like-blog`, { blogId: id, userId: islogin });
            console.log(res);
            console.log(res.data); // Assuming response contains relevant data
            // Add logic here to handle response data, e.g., updating UI to reflect the like status
        } catch (err) {
            console.error(err);
            // Add error handling logic here, e.g., displaying an error message to the user
        }
    };
    // const handleUnlike = async (e) => {
    //     e.preventDefault();
    //     try {
    //         console.log(`like blog : ${id}`);
    //         console.log(`user id is : ${islogin}`);
    //         const res = await axios.put(`/api/v1/user/unlike-blog`, { blogId: id, userId: islogin });
    //         console.log(res);
    //         console.log(res.data); 
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleEdit = (e) => {
        e.preventDefault();
        try {
            navigate(`/blog-details/${id}`)
        } catch (err) {
            console.error(err)
        }
    }
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
            if (data?.success) {
                toast.success('Blog Deleted')
                navigate('/my-blogs')
                await window.location.reload()
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (

        <div className="blog-card">
            <img src={image} alt="Blog" className="blog-image" />
            <h2 className="blog-title">{title}</h2>
            <div className="blog-info">
                <span className="info-label">Author: </span>
                <span className="author">{name}</span>
            </div>
            <div className="blog-info">
                <span className="info-label">Date: </span>
                <span className="time">{time}</span>
            </div>

            {(!isUser && islogin) && <>
                <p className="blog-description">{description}</p>
            </>}




            {isUser && <>
                <div className="button-container">
                    <button className="update-button" onClick={handleEdit}>Update</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                </div>
            </>}

            {(!isUser && islogin) && <>
                <div className="button-container">
                    <button className="like-button" onClick={handleLike}>Like</button>
                    {/* <button className="like-button" onClick={handleUnlike}>UnLike</button> */}
                </div>
            </>}

        </div>

    )
}

export default BlogCard