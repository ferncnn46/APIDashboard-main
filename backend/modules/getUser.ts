import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUser(user: any) {
    
    if(user){

        try {

            const checkData = await prisma.account.findFirst({
                where: {
                    accountId: user.accountId,
                    username: user.username,
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
             
            if(checkData){
                return {
                    status: 'success',
                    data: checkData
                }
            }else{
                return {
                    status: 'error',
                    data: 'Not found data',
                }
            }

        } catch (error) {
            return {
                status: 'error',
                data: 'Fail to get data',
            }
        }
    }else{
        return {
            status: 'error',
            data: 'Required Token',
        }
    }

}