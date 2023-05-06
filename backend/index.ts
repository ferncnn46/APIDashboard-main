import { Request, Response, NextFunction, response } from 'express'

import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = 3001

// const url = "https://slipverify.xyz";
const url = "http://localhost:30001";

const corsOptions = {
    origin: url,
    credentials: true,
    maxAge: 3600
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// Custom CustomRequest
import { CustomRequest } from './custom/custom-request';

// Import Module
// Api user
import { login } from './modules/login'
import { register } from './modules/register'
import { topupSlip } from './modules/topupSlip';
import { slip } from './modules/slip';

// getdata
import { getUser } from './modules/getUser'
import { getPayment } from './modules/getPayment';
import { getPaymentBank } from './modules/getPaymentBank';
import { getLicense } from './modules/getLicense';

import { getAccount } from './modules/getAccount';
import { getDetailAccount } from './modules/getDetailAccount';

// Api Admin
import { editPaymentBank } from './modules/editPaymentBank';
import { editAccount } from './modules/editAccount';
import { genKeys } from './modules/licenseSystem/genlicense';
import { editPlan } from './modules/licenseSystem/editPlan';

// Import Middleware
import { authorizeUser } from './middleware/authorizeUser';
import { authorizeAdmin } from './middleware/authorizeAdmin';
import { verifyToken } from './middleware/verifyToken';

app.get('/', (req: CustomRequest, res: Response, next: NextFunction) => {
    res.status(404).json({
        statusCode: '404',
        message: 'Page is not found!'
    });
})

app.post('/api/auth/login', (req: CustomRequest, res: Response, next: NextFunction) => {
    let { username, password } = req.body;
    if((username && username !=='') && (password && password !=='')){
        login(username, password).then(response => {

            if(response.status == "success"){
                res.status(200).json({
                    status: 'success',
                    token: response.data
                }); 
            }else{
                res.status(400).json({
                    status: 'error',
                    data: response.data
                }); 
            }

        })  

    }else{
        res.status(400).json({
            status: 'error',
            data: 'กรุณารกรอกข้อมุลให้ครบถ้วน'
        }); 
    }
    
})

app.post('/api/auth/register', (req: CustomRequest, res: Response, next: NextFunction) => {
    let { username, email, password, repassword } = req.body;
    
    if((username && username !== '') && (password && password !== '') && (repassword && repassword !== '') && (email && email !== '')){
        
        register(username, password, repassword, email).then(response => {
            if(response.status == "success"){
                res.status(200).json({
                    status: 'success',
                    data: response.data
                }); 
            }else{
                res.status(400).json({
                    status: 'error',
                    data: response.data
                }); 
            }

        })  

    }else{
        res.status(400).json({
            status: 'error',
            data: 'กรุณารกรอกข้อมุลให้ครบถ้วน'
        }); 
    }
    
})

app.get('/api/auth/me', verifyToken,(req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user){
        getUser(user).then(response => {
            if(response.status == 'success'){
                res.status(200).json({
                    status: 'success',
                    data: response.data
                });
            }else{
                res.status(401).json({
                    status: 'error',
                    data: response.data
                }); 
            }
        })
    }
})

// GetData

app.get('/api/getdata/payment', verifyToken, authorizeAdmin, (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        getPayment().then(response => {
            if(response){
                res.status(200).json({
                    status: 'success',
                    data: response
                })
            }else{
                res.status(400).json({
                    statu: 'error',
                    data: 'Fail to get data.'
                })
            } 
        })
    } catch (error) {
        res.status(400).json({
            statu: 'error',
            data: 'Fail to get data.'
        })
    }

})

app.get('/api/getdata/account/all', verifyToken, authorizeAdmin, (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { page , search } = req.query;
        getAccount(page, search).then(response => {
            if(response){
                res.status(200).json({
                    status: 'success',
                    data: response
                })
            }else{
                res.status(400).json({
                    statu: 'error',
                    data: 'Fail to get data.'
                })
            } 
        })
    } catch (error) {
        res.status(400).json({
            statu: 'error',
            data: 'Fail to get data.'
        })
    }

})

app.get('/api/getdata/account', verifyToken, authorizeAdmin, (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;
        getDetailAccount(id).then(response => {
            if(response){
                res.status(200).json({
                    status: 'success',
                    data: response.data
                })
            }else{
                res.status(400).json({
                    statu: 'error',
                    data: 'Fail to get data.'
                })
            } 
        })
    } catch (error) {
        res.status(400).json({
            statu: 'error',
            data: 'Fail to get data.'
        })
    }

})

app.get('/api/getdata/bank', verifyToken, (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        getPaymentBank().then(response => {
            if(response){
                res.status(200).json(response)
            }else{
                res.status(400).json({
                    statu: 'error',
                    data: 'Fail to get data.'
                })
            } 
        })
    } catch (error) {
        res.status(400).json({
            statu: 'error',
            data: 'Fail to get data.'
        })
    }

})

app.get('/api/getdata/license', verifyToken, (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if(user){
            getLicense(user).then(response => {
                if(response){
                    res.status(200).json({
                        status: 'success',
                        data: response
                    })
                }else{
                    res.status(400).json({
                        status: 'error',
                        data: 'Fail to get data.'
                    })
                } 
            })
        }
    } catch (error) {
        res.status(400).json({
            statu: 'error',
            data: 'Fail to get data.'
        })
    }

})

// AdminApi

app.post('/api/edit/bank', verifyToken, authorizeAdmin, async (req: CustomRequest, res: Response, next: NextFunction) => {

    const { bankName, bankAccount, bankCode } = req.body;

    if(!bankName || !bankAccount || !bankCode){
        res.status(400).json({
            status: 'error',
            data: 'กรุณารกรอกข้อมูลให้ครบถ้วน'
        }); 
    }else{

        try {
            const response = await editPaymentBank( bankName, bankAccount, bankCode)
            if(response.status === "success"){
                res.status(200).json({
                    status: 'success'
                }); 
            }else{
                res.status(400).json({
                    status: 'error',
                    data: response.data
                }); 
            }

        } catch (error) {
            res.status(400).json({
                status: 'error',
                data: 'เกิดข้อผิดพลาด'
            });
        }
    }
})

app.post('/api/edit/account', verifyToken, authorizeAdmin, async (req: CustomRequest, res: Response, next: NextFunction) => {

    const { role, point, id } = req.body;

    if(!role || !point || !id){
        res.status(400).json({
            status: 'error',
            data: 'กรุณากรอกข้อมูลให้ครบถ้วน'
        }); 
    }else{

        try {
            const response = await editAccount( id, role, point )
            if(response.status === "success"){
                res.status(200).json({
                    status: 'success'
                }); 
            }else{
                res.status(400).json({
                    status: 'error',
                    data: response.data
                }); 
            }

        } catch (error) {
            res.status(400).json({
                status: 'error',
                data: 'เกิดข้อผิดพลาด'
            });
        }
    }
})

app.post('/api/generate/key', verifyToken, authorizeAdmin, async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if(!id){
        res.status(400).json({
            status: 'error',
            data: 'เกิดข้อผิดพลาด'
        }); 
    }else{
        genKeys(id).then(response => {
            if(response){
                res.status(200).json({
                    status: 'success'
                })
            }else{
                res.status(400).json({
                    status: 'error',
                    data: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งในภายหลัง'
                })
            } 
        }).catch((error) => {
            res.status(400).json({
                status: 'error',
                data: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งในภายหลัง'
            })
        });
    }
})

app.post('/api/edit/plan', verifyToken, authorizeAdmin, async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id, plan } = req.body;

    if(!id || !plan){
        res.status(400).json({
            status: 'error',
            data: 'เกิดข้อผิดพลาด'
        }); 
    }else{
        editPlan(id, plan).then(response => {
            if(response){
                res.status(200).json({
                    status: 'success'
                })
            }else{
                res.status(400).json({
                    status: 'error',
                    data: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งในภายหลัง'
                })
            } 
        }).catch((error) => {
            res.status(400).json({
                status: 'error',
                data: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งในภายหลัง'
            })
        });
    }
})



// UserApi

app.post('/api/v2/slipverify', (req: CustomRequest, res: Response, next: NextFunction) => {
    let { qr_code, license } = req.body;

    if(!license || license == '' ){
        res.status(400).json({
            status: 'error',
            data: 'LICENSE_IS_REQURIED'
        });
    }else{
    
        if( qr_code && qr_code !== ''){
            
            slip(qr_code, license).then(response => {
                if(response.status == 'success'){
                    res.status(200).json({
                        status: 'success',
                        data: response.data
                    });
                }else{
                    res.status(400).json({
                        status: 'error',
                        data: response.data
                    }); 
                }
            })
        }else{
            res.status(400).json({
                status: 'error',
                data: 'QRCODE_IS_REQURIED'
            });
        }
    }
})

app.post('/api/topup/slip', verifyToken, (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    let { qrCode } = req.body;
    if(user){
        if( qrCode && qrCode !== ''){
            topupSlip(qrCode, user).then((response) => {
                if(response){
                    if (response.status === 'success') {
                        res.status(200).json({
                            status: 'success'
                        });
                    } else {
                        res.status(400).json({
                            status: 'error',
                            data: response.data,
                        });
                    } 
                }else{
                    res.status(400).json({
                        status: 'error',
                        data: 'An unknown error occurred',
                    });
                }
            });
        }else{
            res.status(400).json({
                status: 'error',
                data: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            });
        }
    }
})

app.listen(port, () => {
    console.log("---------------------------------------------");
    console.log(`App listening on port ${port}`)
    console.log("---------------------------------------------");
})