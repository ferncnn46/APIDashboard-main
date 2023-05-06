import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";

export async function authorizeAdmin(req: Request, res: Response, next: NextFunction){

    interface DataPayload {
        accountId: number,
        username: string, 
        isAdmin: boolean 
    }

    const authorizationToken = req.headers.authorization;
    
    if (!authorizationToken) {

        return res.status(401).json({ 
            status: 'error',
            data: 'Authorization token not provided' 
        });

    }

    const JWTtoken = authorizationToken.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if(!JWTtoken){

        return res.status(401).json({ 
            status: 'error',
            data: 'Authorization token not provided' 
        });

    }

    if(!jwtSecret){
        return res.status(500).json({ 
            status: 'error',
            data: 'JWT_SECRET environment variable is not set.' 
        });
    }

    try {

        const decoded = jwt.verify(JWTtoken, jwtSecret) as DataPayload;

        if(decoded.isAdmin == true){
            next();
        } else {
            return res.status(403).json({ 
                status: 'error',
                data: 'ขออภัยคุณไม่ได้รับอนุญาตให้เข้าถึงเนื้อหาส่วนนี้' 
            });
        }
        

    } catch (error) {

        return res.status(401).json({ 
            status: 'error',
            data: 'Invalid token' 
        });
        
    }
}