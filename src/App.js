import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Register from './pages/Register'
import Blogs from './pages/Blogs'
import MyBlogs from './pages/MyBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import { Toaster } from 'react-hot-toast';
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes';
import LikeBlogs from './pages/LikeBlogs';

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/my-blogs' element={<MyBlogs />} />
          <Route path='/like-blogs' element={<LikeBlogs />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/blog-details/:id' element={<BlogDetails />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
