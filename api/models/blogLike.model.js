import mongoose from "mongoose";    

const likeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
},{
    timestamps: true
});

const blogLike = mongoose.model('blogLike', likeSchema, 'bloglikes');
export default blogLike;