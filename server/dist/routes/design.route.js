"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_middleware_js_1 = require("../middlewares/multer.middleware.js");
const image_controller_js_1 = require("../controllers/image.controller.js");
const router = express_1.default.Router();
router.post("/profile-pic", multer_middleware_js_1.upload.fields([
    {
        name: "image",
        maxCount: 1,
    },
]), 
//   clerkMiddleware,
image_controller_js_1.imageUpload);
