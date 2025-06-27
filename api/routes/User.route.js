import upload from "../config/multer.js"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/User.controller.js"
import express from 'express'
import { authenticate } from "../middleware/authenticate.js"

const UserRoute = express.Router()

UserRoute.use(authenticate) // Apply authentication middleware to all routes

UserRoute.get('/getUser/:userId',getUser)
UserRoute.put('/updateUser/:userId', upload.single('file'),updateUser) 
UserRoute.get('/getAllUsers',getAllUsers)
UserRoute.delete('/deleteUser/:userId',deleteUser)

export default UserRoute