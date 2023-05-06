import { PrismaClient } from '@prisma/client';

import sanitizeHtml from 'sanitize-html';

import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export async function register(username: string, password: string, repassword: string, email: string) {
    try {
        username = username.trim();
        password = password.trim();
        repassword = repassword.trim();
        email = email.trim();

        const clearUsername = sanitizeHtml(username);

        if(username == '' || password == '' || repassword  == '' || email == ''){
            return {
                status: "error",
                data: "กรุณารกรอกข้อมุลให้ครบถ้วน"
            } 
        }else if(clearUsername !== username){
            return {
                status: "error",
                data: "ชื่อผู้ใช้งานต้องประกอบด้วย a-z หรือ A-Z หรือ 0-9 เท่านั้น"
            } 
        }else if(username.length < 6){
            return {
                status: "error",
                data: "ชื่อผู้ใช้ต้องมีอย่างน้อย 6 ตัว"
            } 
        }else{
            const checkUser = await prisma.account.count({ 
                where: { 
                    OR:[
                        {
                            username: username,
                        },
                        {
                            email: email,
                        }
                    ]
                } 
            });
            if(checkUser){
                return {
                    status: "error",
                    data: "ชื่อผู้ใช้หรืออีเมลนี้มีในระบบแล้ว"
                };
            }else{
                const hashPassword = bcrypt.hashSync(password, 10);
                const createAccount = await prisma.account.create({
                    data: {
                        username: username,
                        password: hashPassword,
                        email: email

                    },
                });
                if(createAccount){
                    return {
                        status: "success",
                    } 
                }else{
                    return {
                        status: "error",
                        data: "เกิดข้อผิดพลาด"
                    }
                }
            }
        }

    } catch (error) {
        return {
            status: "error",
            data: "เกิดข้อผิดพลาด"
        } 
    }
}