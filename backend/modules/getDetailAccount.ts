import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getDetailAccount(id: any) {
    
    try {

        if(id !== '' || !id){

            const intId = parseInt(id);
            const checkData = await prisma.account.findFirst({
                where: {
                    accountId: intId
                },
                select: {
                    accountId: true,
                    username: true,
                    email: true,
                    point: true,
                    createdAt: true,
                    isAdmin: true
                },
            });

            const checkLicense = await prisma.license.findFirst({
                where: {
                    accountId: intId
                },
                select: {
                    licenseid: true,
                    license: true,
                    plan: true
                },
            });
             
            if(!checkData){
                return false
            }

            if(!checkLicense){
                return {
                    data: {
                        account: checkData,
                        license: {
                            license: "Null",
                            plan: "Null"
                        }
                    }
                }
            }else{
                return {
                    data: {
                        account: checkData,
                        license: checkLicense
                    }
                }
            }

        } 
    } catch (error) {
        console.log(error)
        return false
       
    }

}