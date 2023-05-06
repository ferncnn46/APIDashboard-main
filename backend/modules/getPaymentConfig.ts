import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getPaymentConfig() {

    const checkData = await prisma.paymentconfig.findUnique({
        where: {
            id: 1
        }
    })
    
    if(checkData){
        return checkData
    }else{
        return false
    }
    
}