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
exports.authorizeAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authorizeAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorizationToken = req.headers.authorization;
        if (!authorizationToken) {
            return res.status(401).json({
                status: 'error',
                data: 'Authorization token not provided'
            });
        }
        const JWTtoken = authorizationToken.split(' ')[1];
        const jwtSecret = process.env.JWT_SECRET;
        if (!JWTtoken) {
            return res.status(401).json({
                status: 'error',
                data: 'Authorization token not provided'
            });
        }
        if (!jwtSecret) {
            return res.status(500).json({
                status: 'error',
                data: 'JWT_SECRET environment variable is not set.'
            });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(JWTtoken, jwtSecret);
            if (decoded.isAdmin == true) {
                next();
            }
            else {
                return res.status(403).json({
                    status: 'error',
                    data: 'ขออภัยคุณไม่ได้รับอนุญาตให้เข้าถึงเนื้อหาส่วนนี้'
                });
            }
        }
        catch (error) {
            return res.status(401).json({
                status: 'error',
                data: 'Invalid token'
            });
        }
    });
}
exports.authorizeAdmin = authorizeAdmin;
