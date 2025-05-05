"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_middleware_js_1 = require("../middlewares/multer.middleware.js");
const image_controller_js_1 = require("../controllers/image.controller.js");
const clerk_middleware_js_1 = require("../middlewares/clerk.middleware.js");
const router = express_1.default.Router();
router.use((req, res, next) => {
    // console.log("Auth Header:", req.headers.authorization);
    next();
});
router.post("/profile-pic", clerk_middleware_js_1.clerkAuth, multer_middleware_js_1.upload.fields([
    {
        name: "image",
        maxCount: 1,
    },
]), image_controller_js_1.imageUpload);
exports.default = router;
