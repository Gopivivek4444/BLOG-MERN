import express from 'express';
import { GoogleLogin, login, Logout, Register } from '../controllers/Auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const AuthRoute = express.Router();

AuthRoute.post('/Register',Register)
AuthRoute.post('/Login',login)
AuthRoute.post('/googleLogin',GoogleLogin)
AuthRoute.get('/Logout', authenticate ,Logout)
export default AuthRoute;