import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { errorHandler } from "../utils/error";

export const imageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !req.files.image || req.files.image.length === 0) {
      return next(errorHandler(400, res, "Image upload is required"));
    }

    // Upload the image to Cloudinary
    const imageLocalPath = req.files.image[0].path;
    const imageResponse = await uploadOnCloudinary(imageLocalPath);

    if (imageResponse.error) {
      return next(errorHandler(500, res, "Error uploading image"));
    }

    // if (!req.user?.id) {
    //   return next(errorHandler(401, res, "Unauthorized"));
    // }

    // const userId = req.user.id;
    const clerkId = req.auth.userId;

    const user = await User.findOne({ clerkId });

    if (!user) {
      return next(errorHandler(404, res, "User not found"));
    }

    if (!imageResponse.secure_url) {
      return next(
        errorHandler(500, res, "Failed to get image URL from Cloudinary")
      );
    }

    user.image.push(imageResponse.secure_url);
    await user.save();

    res.status(200).json({
      code: 200,
      data: { image: user.image },
      message: "Image uploaded and updated successfully",
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, res, "An error occurred during the upload process"));
  }
};
