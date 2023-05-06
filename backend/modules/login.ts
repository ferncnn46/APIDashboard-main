import { PrismaClient } from '@prisma/client'

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient()

export async function login(username: string, password: string) {
    try {

        username = username.trim();
        password = password.trim();

        const checkData = await prisma.account.findUnique({
            where: {
                username: username,
            },
        });
        if(!checkData){
            return {
                status: "error",
                data: "ชื่อหรือรหัสผ่านผิด"
            };
        }else{
            const jwtSecret = process.env.JWT_SECRET;

            if(!jwtSecret){
                return { 
                    status: 'error',
                    data: 'JWT_SECRET environment variable is not set.' 
                };
            }

            const match = await bcrypt.compare(password, checkData.password).then(function(result: Boolean) {
                return result
            });
            
            if(match){
                const access_token = jwt.sign(
                    {
                        accountId: checkData.accountId,
                        username: checkData.username,
                        isAdmin: checkData.isAdmin
                    },
                    jwtSecret,
                    {
                        expiresIn: '6hr'
                    }
                ); 
                return {
                    status: "success",
                    data: access_token
                } 
            }else{
                return {
                    status: "error",
                    data: "ชื่อหรือรหัสผ่านผิด"
                } 
            }
        }

    } catch (error) {
        console.log(error)
        return {
            status: "error",
            data: "เกิดข้อผิดพลาด"
        } 
    }
    
}