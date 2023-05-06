const scbClass = require("./scbn.class");

import { getBankName } from '../data/BankName'

export async function slipVerify(qr_code: string) {
    try {
        const scb = new scbClass(
            "4320918628",
            "89cab983-010f-4319-8e09-6a0cc10ea20d",
            "477834",
            "144ffd8a-75d9-4c41-982d-24a95045678c"
        );
        console.log(scb);
        await scb.login()
        const response = await scb.qrScan(qr_code);
        if(response.status.code === 1000){
            if(response.data.pullSlip.function === "TRANSFER"){

                const BankCodeSender = getBankCode(response.data.pullSlip.sender.bankLogo)
                const BankCodeReceiver = getBankCode(response.data.pullSlip.receiver.bankLogo)
                const bankNameSender = await getBankName(BankCodeSender);
                const bankNameReceiver = await getBankName(BankCodeReceiver);

                return {
                    status: 'success',
                    data: {
                        amount: response.data.amount,
                        transRef: response.data.pullSlip.transRef,
                        dateTime: response.data.pullSlip.dateTime,
                        sender: {
                            bankId: BankCodeSender,
                            bankName: bankNameSender,
                            accountName: response.data.pullSlip.sender.name,
                            accountNumber : response.data.pullSlip.sender.accountNumber
                        },
                        receiver: {
                            bankId: BankCodeReceiver,
                            bankName: bankNameReceiver,
                            accountName: response.data.pullSlip.receiver.name,
                            accountNumber : response.data.pullSlip.receiver.accountNumber
                        },
                    }
                }
            }else{
                // ผู้รับไม่ใช่บัญชีธนาคาร หรือ เป็นสลิปเติมเงิน
                return {
                    status: 'error',
                    data: 'INVALID_TYPE_METHOD'
                }
            }
            
        }else if(response.status.code === 1204){
            // ไม่สามารถอ่าน บาร์โค้ด/คิวอาร์โค้ด นี้ได้
            return {
                status: 'error',
                data: 'INVALID_QRCODE'
            }
        }else if(response.status.code === 3024){
            // ไม่พบสลิป
            return {
                status: 'error',
                data: 'SLIP_NOT_FOUND'
            }
        }else{
            
            return {
                status: 'error',
                data: response.status.description
            }
        }
    } catch (error) {
        return {
            status: 'error',
            data: 'SERVER_IS_UNAVAILABEL'
        }
    }
}

function getBankCode(Url: string){
    return Url.replace('/transfer/bank-logo/', '').replace('.png', '')
}