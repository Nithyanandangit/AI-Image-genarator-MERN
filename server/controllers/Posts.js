import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: 'dsqmwmd0t',
  api_key: '321565929976865',
  api_secret: 'Q34bhHvhRXIModK35f6wI9udE8g',
  secure: true,
});

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return next(
      createError(
        error.status,
        error?.response?.data?.error.message || error.message
      )
    );
  }
};

// Create new post
export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });

    return res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    console.log(error);
    return next(
      createError(error.status, error?.response?.data?.error.message)
    );
  }
};