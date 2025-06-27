// import express from "express"
// import { doLike, likeCount } from "../controllers/BlogLike.controller.js"



// const BlogLikeRoute = express.Router()

// BlogLikeRoute.post('/doLike', doLike)
// BlogLikeRoute.get('/getLike/:blogId/:userId?', likeCount)

// export default BlogLikeRoute

import express from "express";
import { doLike, likeCount } from "../controllers/BlogLike.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const BlogLikeRoute = express.Router();

BlogLikeRoute.post("/doLike", authenticate, doLike);

// Two separate routes to avoid optional parameter
BlogLikeRoute.get("/getLike/:blogId/:userId", likeCount);
BlogLikeRoute.get("/getLike/:blogId", likeCount); // fallback when no userId

export default BlogLikeRoute;
