"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const cloudinary_js_1 = require("../utils/cloudinary.js");
const error_1 = require("../utils/error");
const imageUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || !req.files.image || req.files.image.length === 0) {
            return next((0, error_1.errorHandler)(400, res, "Profile picture upload is required"));
        }
        // Upload the image to Cloudinary
        const imageLocalPath = req.files.image[0].path;
        const imageResponse = yield (0, cloudinary_js_1.uploadOnCloudinary)(imageLocalPath);
        if (imageResponse.error) {
            return next((0, error_1.errorHandler)(500, res, "Error uploading image"));
        }
        const userId = req.user.id;
        const user = yield user_model_js_1.default.findByIdAndUpdate(userId, { image: imageResponse.secure_url }, { new: true });
        if (!user) {
            return next((0, error_1.errorHandler)(404, res, "User not found"));
        }
        res.status(200).json({
            code: 200,
            data: { image: user.image },
            message: "Profile picture uploaded and updated successfully",
        });
    }
    catch (error) {
        console.log(error);
        next((0, error_1.errorHandler)(500, res, "An error occurred during the upload process"));
    }
});
exports.imageUpload = imageUpload;
