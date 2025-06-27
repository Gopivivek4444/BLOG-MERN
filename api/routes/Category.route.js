import express from "express"
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from "../controllers/Category.controller.js"
import { get } from "mongoose"
import { onlyAdmin } from "../middleware/onlyAdmin.js"


const CategoryRoute = express.Router()

CategoryRoute.post('/addCategory',onlyAdmin, addCategory)
CategoryRoute.put('/updateCategory/:categoryId',onlyAdmin, updateCategory)
CategoryRoute.get('/showCategory/:categoryId',onlyAdmin, showCategory)
CategoryRoute.delete('/deleteCategory/:categoryId',onlyAdmin, deleteCategory)
CategoryRoute.get('/getAllCategory', getAllCategory)

export default CategoryRoute