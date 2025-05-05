import { Request, Response } from "express";
import User from "../models/user.model.js";

export const syncClerkUser = async (req: Request, res: Response) => {
  try {
    const { clerkId, email} = req.body;

    // Check if user already exists
    let user = await User.findOne({ clerkId });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      clerkId,
      email,
      // Add any other fields you want to store
    });

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
