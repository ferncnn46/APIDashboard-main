import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";

interface DataPayload {
    accountId: number,
    username: string, 
    isAdmin: boolean 
}

interface CustomRequest extends Request {
    user?: DataPayload;
}

export async function verifyToken(req: CustomRequest, res: Response, next: NextFunction){

    

    const authorizationToken = req.headers.authorization;
    
    if (!authorizationToken) {

        return res.status(401).json({ 
            status: 'error',
            data: 'Authorization token not provided' 
        });

    }

    const JWTtoken = authorizationToken.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    try {

        if(jwtSecret){

            const decoded = jwt.verify(JWTtoken, jwtSecret) ;
            req.user = decoded as DataPayload;

            next();

        }else{
            return res.status(401).json({ 
                status: 'error',
                data: 'Invalid token' 
            });
        }

    } catch (error) {
        return res.status(401).json({ 
            status: 'error',
            data: 'Invalid token' 
        });
    }
}