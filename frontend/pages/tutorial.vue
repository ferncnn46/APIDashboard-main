<template>
    <div>
        <header class="mb-5">
            <h5 class="font-semibold text-lg">คู่มือการใช้งาน</h5>
        </header>
        <div class="card border rounded-lg shadow p-4 bg-white">
            <div class="card-header mb-5">
                <span class="text-sm bg-green-700 text-white px-3 py-0.5 rounded-full mr-3">POST</span><p class=" inline">https://api.slipverify.xyz/api/v2/slipverify</p>
            </div>
            <div class="card-body">
                <div class="code-section mb-4">
                    <p class="font-semibold mb-2">Body</p>
                    <table class="table-auto w-full">
                        <thead class="bg-slate-200">
                            <tr>
                                <th class="p-2 text-left">ค่าที่ต้องส่ง</th>
                                <th class="p-2 text-left">ชนิดข้อมูล</th>
                                <th class="p-2 text-left">คำอธิบาย</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-slate-200">
                                <td class="p-2">qr_code</td>
                                <td class="p-2">String</td>
                                <td class="p-2">ค่าที่ได้จากการอ่านสลิป</td>
                            </tr>
                            <tr class="border-b border-slate-200">
                                <td class="p-2">license</td>
                                <td class="p-2">String</td>
                                <td class="p-2">คีย์ API</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="code-section">
                    <p class="font-semibold mb-2">Response</p>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-green-500 rounded-full p-1 mr-3"></span>200 : Success | สำเร็จ</p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "success",</p>
                            <p class="ml-5">"data" : {</p>
                            <p class="ml-10">"amount" : 2000,</p>
                            <p class="ml-10">"transRef" : "013037103036BOR05782",</p>
                            <p class="ml-10">"dateTime" : "2023-02-06T10:30:00+07:00",</p>
                            <p class="ml-10">"sender" : {</p>
                            <p class="ml-16">"bankId" : "004",</p>
                            <p class="ml-16">"bankName" : "ธนาคารกสิกรไทย",</p>
                            <p class="ml-16">"accountName" : "นาย อภิวิชญ์ ว",</p>
                            <p class="ml-16">"accountNumber" : "xxx-x-x7522-x"</p>
                            <p class="ml-10">},</p>
                            <p class="ml-10">"receiver" : {</p>
                            <p class="ml-16">"bankId" : "006",</p>
                            <p class="ml-16">"bankName" : "ธนาคารกรุงไทย",</p>
                            <p class="ml-16">"accountName" : "นายอภิวิชญ์ วิศาลเลิศศิริ",</p>
                            <p class="ml-16">"accountNumber" : "xxx-x-x1593-x"</p>
                            <p class="ml-10">},</p>
                            <p class="ml-5">}</p>
                            <p>}</p>
                        </div>
                    </div>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-red-500 rounded-full p-1 mr-3"></span>400 : Bad Request | LICENSE_IS_REQURIED / ต้องการ LicenseKey</p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "error",</p>
                            <p class="ml-5">"data" : "LICENSE_IS_REQURIED"</p>
                            <p>}</p>
                        </div>
                    </div>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-red-500 rounded-full p-1 mr-3"></span>400 : Bad Request | QRCODE_IS_REQURIED / ต้องการ Qr Code</p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "error",</p>
                            <p class="ml-5">"data" : "QRCODE_IS_REQURIED"</p>
                            <p>}</p>
                        </div>
                    </div>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-red-500 rounded-full p-1 mr-3"></span>400 : Bad Request | INVALID_LICENSE / License Key ไม่ถูกต้องหรือไม่มีในระบบ</p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "error",</p>
                            <p class="ml-5">"data" : "INVALID_LICENSE"</p>
                            <p>}</p>
                        </div>
                    </div>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-red-500 rounded-full p-1 mr-3"></span>400 : Bad Request | LICENSE_UNAUTHORIZED / License Key ยังไม่ได้รับอนุญาตให้ใช้งาน</p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "error",</p>
                            <p class="ml-5">"data" : "LICENSE_UNAUTHORIZED"</p>
                            <p>}</p>
                        </div>
                    </div>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-red-500 rounded-full p-1 mr-3"></span>400 : Bad Request | YOUR_BALANCE_IS_NOT_ENOUGH / เงินในระบบไม่พอ</p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "error",</p>
                            <p class="ml-5">"data" : "YOUR_BALANCE_IS_NOT_ENOUGH"</p>
                            <p>}</p>
                        </div>
                    </div>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-red-500 rounded-full p-1 mr-3"></span>400 : Bad Request | TYPE_SLIP_NOT_SUPPORT / ประเภทสลิปไม่ถูกต้องหรือไม่ใช่สลิปโอนเงิน </p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "error",</p>
                            <p class="ml-5">"data" : "TYPE_SLIP_NOT_SUPPORT"</p>
                            <p>}</p>
                        </div>
                    </div>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-red-500 rounded-full p-1 mr-3"></span>400 : Bad Request | INVALID_QRCODE / QR Code ไม่ถูกต้อง</p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "error",</p>
                            <p class="ml-5">"data" : "INVALID_QRCODE"</p>
                            <p>}</p>
                        </div>
                    </div>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-red-500 rounded-full p-1 mr-3"></span>400 : Bad Request | SERVER_IS_UNAVAILABEL / เซิฟเวอร์มีปัญหา</p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "error",</p>
                            <p class="ml-5">"data" : "SERVER_IS_UNAVAILABEL"</p>
                            <p>}</p>
                        </div>
                    </div>
                    <div class="mb-5">
                        <p class="font-semibold mb-3"><span class="bg-red-500 rounded-full p-1 mr-3"></span>400 : Bad Request | NOT_FOUND_DATA / ไม่พบข้อมูลผู้ใช้งาน</p>
                        <div class="p-3 bg-slate-200">
                            <p>{</p>
                            <p class="ml-5">"status" : "error",</p>
                            <p class="ml-5">"data" : "NOT_FOUND_DATA"</p>
                            <p>}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
</template>
<script>
    export default {
        middleware: ["AuthLogin"],
        layout: 'Layouts'
    }
</script>