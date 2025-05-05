import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { imageUpload } from "../controllers/image.controller.js";
import { clerkAuth } from "../middlewares/clerk.middleware.js";

const router = express.Router();

router.use((req, res, next) => {
  // console.log("Auth Header:", req.headers.authorization);
  next();
});

router.post(
  "/profile-pic",
  clerkAuth,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),

  imageUpload
);

export default router;
