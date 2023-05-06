import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function editPaymentBank(bankName: string, bankAccount: string, bankCode: string) {

    if(!bankName || !bankAccount || !bankCode){
        return {
            status: 'error',
            data: 'กรุณารกรอกข้อมุลให้ครบถ้วน'
        }
    }else{
        const updateData = await prisma.paymentconfig.update({
            where: {
                id: 1
            },
            data: {
                bankAccount: bankAccount,
                bankName: bankName,
                bankCode: bankCode
            },
        })

        if(!updateData){
            return {
                status: 'error',
                data: 'เกิดข้อผิดพลาด'
            }
        }else{
            return {
                status: 'success'
            }
        }
    }
}