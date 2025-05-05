import { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const syncClerkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clerkId, email } = req.body;

    let user = await User.findOne({ clerkId });

    if (user) {
      next(errorHandler(400, res, "User already exists"));
    }

    user = new User({
      clerkId,
      email,
    });

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    next(errorHandler(500, res, "Server error"));
  }
};
