import { PrismaClient } from '@prisma/client'
import { getBankName } from './data/BankName'

const prisma = new PrismaClient()

export async function getPaymentBank() {

    const checkData = await prisma.paymentconfig.findUnique({
        where: {
            id: 1
        },
        select:{
            bankAccount: true,
            bankCode: true,
            bankName: true
        }
    })
    
    if(checkData){

        const bankName = await getBankName(checkData.bankCode);

        return {
            account: checkData.bankAccount,
            name: checkData.bankName,
            bank: {
                name: bankName,
            }
        }
    }else{
        return false
    }
    
}