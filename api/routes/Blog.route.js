import express from 'express';
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from '../controllers/Blog.controller.js';
import upload from '../config/multer.js';
import { authenticate } from '../middleware/authenticate.js';

const BlogRoute = express.Router();

BlogRoute.post('/addBlog', authenticate ,upload.single('file'),addBlog)
BlogRoute.get('/editBlog/:blogId', authenticate ,editBlog)
BlogRoute.put('/updateBlog/:blogId', authenticate ,upload.single('file'),updateBlog)
BlogRoute.delete('/deleteBlog/:blogId', authenticate ,deleteBlog)
BlogRoute.get('/showAllBlog' ,authenticate, showAllBlog)



BlogRoute.get('/getBlog/:slug',getBlog)
BlogRoute.get('/getRelatedBlog/:category/:blog',getRelatedBlog)
BlogRoute.get('/getBlogByCategory/:category',getBlogByCategory)
BlogRoute.get('/search',search)
BlogRoute.get('/getAllBlogs' , getAllBlogs)
export default BlogRoute;
    