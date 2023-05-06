import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAccount(page: any, search: any) {
    
    const setAmountData = 5

    try {
    
        const itemCount = await prisma.account.count({
            where: {
                OR: [
                    { username: { contains: search } },
                    { email: { contains: search } },
                ],
            },
        })

        if(itemCount < setAmountData){
            const skip = 0
            const checkData = await prisma.account.findMany({
                take: setAmountData,
                skip: skip,
                select: {
                    accountId: true,
                    username: true,
                    email: true,
                    point: true,
                    isAdmin: true
                },
                where: {
                    OR: [
                        { username: { contains: search } },
                        { email: { contains: search } },
                    ],
                },
            });

            if(checkData){
                return {
                    totalPages: Math.ceil(itemCount/setAmountData),
                    data: checkData
                }
                
            }else{
                return false
            }
        }else{
            const skip = (page-1)*setAmountData
            const checkData = await prisma.account.findMany({
                take: setAmountData,
                skip: skip,
                select: {
                    accountId: true,
                    username: true,
                    email: true,
                    point: true,
                    isAdmin: true,
                },
                where: {
                    OR: [
                        { username: { contains: search } },
                        { email: { contains: search } },
                    ],
                },
            });

            if(checkData){
                return {
                    totalPages: Math.ceil(itemCount/setAmountData),
                    data: checkData
                }
                
            }else{
                return false
            }
        }
        
        

    } catch (error) {
        return false
    }

}