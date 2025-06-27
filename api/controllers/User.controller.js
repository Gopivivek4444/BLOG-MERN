import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import User from "../models/model.user.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId }).lean().exec();
    if (!user) {
      next(handleError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User data found",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userId } = req.params;

    const user = await User.findById(userId);
    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;
    if (data.password && data.password >= 8) {
      const hashedPassword = bcrypt.hashSync(data.password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "user", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });
      user.avatar = uploadResult.secure_url;
    }

    await user.save();

    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      message: "data updated successfully",
      user: newUser,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    next(handleError(500, error.message));
    
  }
}
export const deleteUser = async (req, res, next) => { 
  try {
    const { userId } = req.params;

    const users = await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    next(handleError(500, error.message));
    
  }
}
