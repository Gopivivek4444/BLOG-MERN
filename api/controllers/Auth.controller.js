import { handleError } from '../helpers/handleError.js';
import User from '../models/model.user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      // Use handleError to pass a proper error to next()
      return next(handleError(409, 'User already exists with this email'));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const login = async (req, res, next) =>{
  try {
      const {email, password} = req.body;
      const user = await User.findOne({email})
      if(!user){
        return next(handleError(404, "Invalid email or password"))
      }
      const hashedPassword = user.password
      const isPasswordValid = bcrypt.compareSync(password, hashedPassword)
      if(!isPasswordValid){
        return next(handleError(404, "Invalid email or password"))
      }

      const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar:user.avatar
      },process.env.JWT_SECRET)

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
        path: '/'
      })

      const newUser = user.toObject({getters: true});
      delete newUser.password; // Remove password from the response

      res.status(200).json({
        success: true,
        user: newUser,
        message: 'Login successful'
        
      })

  } catch (error) {
    next(handleError(500, error.message));
  }
}
export const GoogleLogin = async (req, res, next) =>{
  try {
      const {name, email, avatar} = req.body;
      let user
      user = await User.findOne({email})
      if(!user){
        const password = Math.random().toString();
        const newUser = new User({
          name,
          email,
          password: bcrypt.hashSync(password, 10),
          avatar
        })

        user = await newUser.save();
      }

      const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar:user.avatar
      },process.env.JWT_SECRET)

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
        path: '/'
      })

      const newUser = user.toObject({getters: true});
      delete newUser.password; // Remove password from the response

      res.status(200).json({
        success: true,
        user: newUser,
        message: 'Login successful'
        
      })

  } catch (error) {
    next(handleError(500, error.message));
  }
}

export const Logout = async (req, res, next) =>{
  try {
      

      res.clearCookie('access_token',  {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
        path: '/'
      })

      res.status(200).json({
        success: true,
        message: 'Logout successful'
        
      })

  } catch (error) {
    next(handleError(500, error.message));
  }
}