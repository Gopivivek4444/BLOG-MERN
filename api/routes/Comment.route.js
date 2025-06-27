import express from "express"
import { addComment, commentCount, deleteComment, getAllComments, getComments } from "../controllers/Comment.controller.js"
import { authenticate } from "../middleware/authenticate.js"


const CommentRoute = express.Router()

CommentRoute.post('/addComment',authenticate, addComment)
CommentRoute.get('/getComments/:blogId', getComments)
CommentRoute.get('/getCount/:blogId',commentCount)
CommentRoute.get('/getAllComments',authenticate, getAllComments)
CommentRoute.delete('/deleteComment/:commentId',authenticate, deleteComment)
export default CommentRoute