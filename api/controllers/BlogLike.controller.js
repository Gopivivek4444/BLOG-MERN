import { handleError } from '../helpers/handleError.js';
import blogLike from '../models/blogLike.model.js';

export const doLike = async(req, res, next) => {
    try {
        const {userId, blogId} = req.body
        let like
        like = await blogLike.findOne({userId, blogId})
        if(!like){
            const saveLike = new blogLike({
                userId, blogId
            })
            like = await saveLike.save()
        }else{
            await blogLike.findByIdAndDelete(like._id)
        }
        const likeCount = await blogLike.countDocuments({blogId})

        res.status(200).json({
            likeCount
        })

    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const likeCount = async(req, res, next) => {
    try {

        const {blogId, userId} = req.params
        const likeCount = await blogLike.countDocuments({blogId})

        let isUserLiked = false
        if(userId){
            const getuserLike = await blogLike.countDocuments({blogId, userId})
            if(getuserLike>0){
                isUserLiked = true
            }
        }
        res.status(200).json({
            likeCount,
            isUserLiked
        })

        
    } catch (error) {
        next(handleError(500, error.message));
    }
}

