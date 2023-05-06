import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function editPlan(id: number, plan: string) {
    try {
        if(plan == 'NotAllow' || plan == 'Basic' || plan == 'Pro' || plan == 'Premium'){
            const updateLicense = await prisma.license.update({
                where: { 
                    licenseid: id
                },
                data: { 
                    plan: plan
                },
            });

            if(!updateLicense){
                return false
            }

            return true
        }else{
            return false
        }
        

    } catch (error) {
        return false
    }
}