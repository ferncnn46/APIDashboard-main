import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function genKeys(id: number) {
    

    try {
        const newLicense = generateKey();

        const checkLicense = await prisma.license.count({ 
            where: { 
                license: newLicense
            } 
        });
        if(checkLicense == 0){
            
            const createLicense = await prisma.license.create({
                data: {
                    license: newLicense,
                    accountId: id
                },
            });

            if(!createLicense){
                return false
            }

            return true
        }
        

    } catch (error) {
        return false
    }

}

function generateKey() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var sections = [];
    for (var i = 0; i < 4; i++) {
      var section = "";
      for (var j = 0; j < 4; j++) {
        section += chars[Math.floor(Math.random() * chars.length)];
      }
      sections.push(section);
    }
    return sections.join("-");
}