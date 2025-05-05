import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { imageUpload } from "../controllers/image.controller.js";
import { clerkMiddleware } from "../middlewares/clerk.middleware.js";

const router = express.Router();

router.post(
  "/profile-pic",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
//   clerkMiddleware,
  imageUpload
);

export default router;
