import { handleError } from '../helpers/handleError.js';
import Comment from '../models/comment.model.js';

export const addComment = async(req, res, next) => {
    try {
        const {user, blogId, comment} = req.body
        const newComment = new Comment({
            user: user,
            blogId: blogId,
            comment: comment
        })

        await newComment.save()
        res.status(200).json({
            success: true,
            message: "Commented successfully",
            comment: newComment
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const getComments = async(req, res, next) => {
    try {
        
        const {blogId} = req.params
        const comments = await Comment.find({blogId}).populate('user', 'name avatar').sort({createdAt: -1}).lean().exec()

        res.status(200).json({
            comments
            
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const commentCount = async(req, res, next) => {
    try {
        
        const {blogId} = req.params
        const commentCount = await Comment.countDocuments({blogId})

        res.status(200).json({
            commentCount
            
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const getAllComments = async(req, res, next) => {
    try {
        const user = req.user;
        let comments;
        console.log(user.role);
        if(user.role === 'admin') {
            comments = await Comment.find().populate('blogId', 'title').populate('user', 'name').sort({ createdAt: -1 }).lean().exec();
        }else{
            comments = await Comment.find({user: user._id}).populate('blogId', 'title').populate('user', 'name').sort({ createdAt: -1 }).lean().exec();
        }

        res.status(200).json({
            comments
            
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const deleteComment = async(req, res, next) => {
    try {
        
        const {commentId} = req.params
        await Comment.findByIdAndDelete(commentId)

        res.status(200).json({
            success: true,
            message: 'comment deleted successfully'
            
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
}