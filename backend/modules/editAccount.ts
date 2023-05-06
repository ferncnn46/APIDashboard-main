import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function editAccount(id: number, role: boolean, point: any) {
    try {
        if(!role || !point || !id){
            return {
                status: 'error',
                data: 'กรุณารกรอกข้อมุลให้ครบถ้วน'
            }
        }else{
            const intPoint = parseInt(point);
            const updateData = await prisma.account.update({
                where: {
                    accountId: id
                },
                data: {
                    point: intPoint,
                    isAdmin: role
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

    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            data: 'เกิดข้อผิดพลาด'
        }
       
    }
}