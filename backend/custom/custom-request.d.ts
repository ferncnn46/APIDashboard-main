import { Request } from 'express';

interface DataPayload {
    accountId: number;
    username: string;
    isAdmin: boolean;
}

export interface CustomRequest extends Request {
    user?: DataPayload;
}
//pongpayom