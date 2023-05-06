import { PrismaClient } from '@prisma/client';
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

export async function getLicense(user: any) {
    
    if(user){

        const checkUser = await getUser(user);
        const Data = checkUser.data
        const userData = Data as UserPayload

        try {

            const checkData = await prisma.license.findFirst({
                where: {
                    accountId: userData.accountId
                },
                select: {
                    license: true,
                    plan: true,
                },
            });
             
            if(!checkData){
                return {
                    license: 'Null',
                    plan: 'Null',
                }
            }else{
                return {
                    license: checkData.license,
                    plan: checkData.plan+" ( "+getDetail(checkData.plan)+" )",
                }
            }

        } catch (error) {
            return false
        }
    }else{
        return false
    }

}
function getDetail(plan: string){
    if(plan == 'Basic'){
        return "1 บาท / สลิป"
    }else if(plan == 'Pro'){
        return "0.5 บาท / สลิป"
    }else if(plan == 'Premium'){
        return "0 บาท / สลิป"
    }else{
        return "ยังไม่ได้รับอนุญาต / ระงับการใช้งานชั่วคราว"
    }
}