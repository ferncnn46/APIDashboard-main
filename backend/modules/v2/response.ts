const scbClass = require("./scb.js");

import { getBankName } from '../data/BankName'

export async function slipVerify(qr_code: string) {
    try {
        // config
        const deviceId = '5a27712b-3a0b-61c5-184a-357c907042c6';

        const apiAuth = await scbClass.preload(deviceId);
        const response = await scbClass.scanBill(apiAuth, qr_code);

        if(response){

            const slipType = response.pullSlip.function;
            
            if(slipType !== 'TRANSFER'){
                return {
                    status: 'error',
                    data: 'TYPE_SLIP_NOT_SUPPORT'
                }
            }else{

                const amount = response.amount
                const BankCodeSender = getBankCode(response.pullSlip.sender.bankLogo)
                const BankCodeReceiver = getBankCode(response.pullSlip.receiver.bankLogo)
                const bankNameSender = await getBankName(BankCodeSender);
                const bankNameReceiver = await getBankName(BankCodeReceiver);

                return {
                    status: 'success',
                    data: {
                        amount: amount,
                        transRef: response.pullSlip.transRef,
                        dateTime: response.pullSlip.dateTime,
                        sender: {
                            bankId: BankCodeSender,
                            bankName: bankNameSender,
                            accountName: response.pullSlip.sender.name,
                            accountNumber : response.pullSlip.sender.accountNumber
                        },
                        receiver: {
                            bankId: BankCodeReceiver,
                            bankName: bankNameReceiver,
                            accountName: response.pullSlip.receiver.name,
                            accountNumber : response.pullSlip.receiver.accountNumber
                        },
                    }
                }
            }
        }else{
            
            return {
                status: 'error',
                data: 'INVALID_QRCODE'
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
    return Url.split('/')[3].split('.')[0]
}