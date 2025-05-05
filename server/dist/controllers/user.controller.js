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
exports.syncClerkUser = void 0;
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const error_js_1 = require("../utils/error.js");
const syncClerkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clerkId, email } = req.body;
        let user = yield user_model_js_1.default.findOne({ clerkId });
        if (user) {
            next((0, error_js_1.errorHandler)(400, res, "User already exists"));
        }
        user = new user_model_js_1.default({
            clerkId,
            email,
        });
        yield user.save();
        res.status(201).json({ user });
    }
    catch (error) {
        console.error("Error creating user:", error);
        next((0, error_js_1.errorHandler)(500, res, "Server error"));
    }
});
exports.syncClerkUser = syncClerkUser;
