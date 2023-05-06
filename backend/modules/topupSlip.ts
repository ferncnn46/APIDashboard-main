import { PrismaClient } from '@prisma/client'
import axios from 'axios';

import { getUser } from './getUser';
import { getPaymentConfig } from "./getPaymentConfig";
import { slipVerify } from "./v2/response";

const prisma = new PrismaClient()

interface slipDataPayload {
    amount: number,
    transRef: string,
    dateTime: string,
    sender: {
        bankId: string,
        bankName: string,
        accountName: string,
        accountNumber : string
    },
    receiver: {
        bankId: string,
        bankName: string,
        accountName: string,
        accountNumber : string
    },

}

export async function topupSlip(qr_code: string, user: any) {

    if(!qr_code || qr_code == ''){
        return{
            status: 'error',
            data: 'ไม่พบ QrCode หรือ สลิปไม่มี QrCode'
        }
    }else{
        const checkUser = await getUser(user);
        const dataPayment = await getPaymentConfig();

        if(!dataPayment || dataPayment.bankAccount == '' || dataPayment.bankCode == '' || dataPayment.bankName == ''){
            return {
                status: 'error',
                data: 'ขออภัยระบบเติมเงินยังไม่พร้อมใช้งาน',
            }
        }
        if(checkUser.status == 'success'){

            const slipData = await slipVerify(qr_code);
            if(slipData.status == 'error'){
                return {
                    status: 'error',
                    data: slipData.data
                }
            }

            const slip = slipData.data as slipDataPayload;
                
            const reciverData = slip.receiver
            const bankName = dataPayment.bankName;
            const accountName = reciverData.accountName;

            if((reciverData.bankId !== dataPayment.bankCode) || (!checkBankNuber(reciverData.accountNumber, dataPayment.bankAccount)) || (!accountName.includes(bankName))){
                return {
                    status: 'error',
                    data: 'ข้อมูลบัญชีของผู้รับไม่ถูกต้อง',
                };
            }

                const checkTranfer = await prisma.historytopup.findFirst({
                    where: {
                        code: qr_code
                    }
                });

                const dataUser: any = checkUser.data
                const amount = slip.amount

                const newAmount = dataUser.point+amount
                
                if(checkTranfer){
                    return {
                        status: 'error',
                        data: 'สลิปอันนี้ถูกใช้งานเรียบร้อยแล้ว',
                    };
                }else{
                    const addHistory = await prisma.historytopup.create({
                        data:{
                            method: 'bank',
                            code: qr_code,
                            amount: amount,
                            accountId: dataUser.accountId
                        }
                    })

                    if(!addHistory){
                        return {
                            status: 'error',
                            data: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
                        };
                    }else{
                        const updatePoint = await prisma.account.update({
                            where: { 
                                accountId: dataUser.accountId
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

                        return{
                            status: 'success'
                        }
                    }

                    
                }
                

        }else{
            return {
                status: 'error',
                data: 'Authorized failure',
            }
        }
        
    }
}

function checkBankNuber(receiver: string, target: string){

    const pattern = receiver.toLowerCase().replace(/-/g,"").replace(/x/g, '.');
    const regex = new RegExp(pattern);

    return regex.test(target);
}