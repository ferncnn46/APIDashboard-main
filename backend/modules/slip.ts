import { PrismaClient } from '@prisma/client'
import { slipVerify } from "./v2/response";
import { getUser } from './getUser';

const prisma = new PrismaClient()

interface UserPayload {
    accountId: number,
    username: string,
    email: string,
    point: number,
    createdAt: Date,
    isAdmin: boolean,

}

export async function slip(qr_code: string, license: string) {

    try {

        if(!license || license == '' ){
            return {
                status: 'error',
                data: 'LICENSE_IS_REQURIED'
            };
        }else if(!qr_code || qr_code == ''){
            return {
                status: 'error',
                data: 'QRCODE_IS_REQURIED'
            };
        }else{
                
            const checklicense = await prisma.license.findFirst({
                where: {
                    license: license,
                }
            });
            if(!checklicense){
                return {
                    status: 'error',
                    data: 'INVALID_LICENSE'
                }
            }else{

                const userData = await prisma.account.findFirst({
                    where: {
                        accountId: checklicense.accountId,
                    },
                    select: {
                        accountId: true,
                        username: true,
                        email: true,
                        point: true,
                        createdAt: true,
                        isAdmin: true,
                    },
                });
                if(!userData){
                    return {
                        status: 'error',
                        data: 'NOT_FOUND_DATA'
                    }
                }

                const plan = checklicense.plan
                if(plan === "NotAllow"){
                    return {
                        status: 'error',
                        data: 'LICENSE_UNAUTHORIZED'
                    }
                }else if(plan === 'Basic' || plan === 'Pro'){
                    
                    const price = getprice(plan);
                    
                    if(price > userData.point){
                        return {
                            status: 'error',
                            data: 'YOUR_BALANCE_IS_NOT_ENOUGH'
                        }
                    }else{
                        
                        const checklHistory = await prisma.historyslip.count({ 
                            where: {
                                qrCode: qr_code,
                                accountId: userData.accountId 
                            }
                        });
                        
                        const slipData = await slipVerify(qr_code);
                        
                        if(checklHistory == 0){
                            
                            if(slipData.status == 'error'){
                                return {
                                    status: 'error',
                                    data: slipData.data
                                }
                            }else{
                                const slip = slipData.data;
                            
                                const newAmount = userData.point - price
                                
                                const updatePoint = await prisma.account.update({
                                    where: { 
                                        accountId: userData.accountId
                                    },
                                    data: { 
                                        point: newAmount 
                                    },
                                });
                                
                                if(!updatePoint){
                                    return {
                                        status: 'error',
                                        data: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
                                    };
                                }
                                
                                const addHistory = await prisma.historyslip.create({
                                    data:{
                                        qrCode: qr_code,
                                        accountId: userData.accountId
                                    }
                                })
                                
                                if(!addHistory){
                                    return {
                                        status: 'error',
                                        data: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
                                    };
                                }
                                
                                return {
                                    status: 'success',
                                    data: slip
                                }
                            
                            }
                        }else{
                            return {
                                status: 'success',
                                data: slipData.data
                            }
                        }
                    }
                }else if(plan === 'Premium'){
                    const slipData = await slipVerify(qr_code);
                    if(slipData.status == 'error'){
                        return {
                            status: 'error',
                            data: slipData.data
                        }
                    }else{
                        const slip = slipData.data;
                        return {
                            status: 'success',
                            data: slip
                        }
                    }
                    
                }else{
                    return {
                        status: 'error',
                        data: 'LICENSE_UNAUTHORIZED'
                    }
                }
                
            }

        }

    } catch (error) {
        return {
            status: 'error',
            data: 'SERVER_IS_UNAVAILABEL'
        }
    }

}

// จ่าย 0.5
// Basic

// จ่าย 0.25
// Pro

// ใช้ฟรี
// Premium

function getprice(licensetype: string){

    if(licensetype == 'Basic'){
        return 1
    }else if(licensetype == 'Pro'){
        return 0.5
    }else if(licensetype == 'Premium'){
        return 0
    }else{
        return 999999
    }

}