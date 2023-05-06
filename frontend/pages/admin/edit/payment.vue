<template>
    <div>
        <header class="mb-5">
            <h5 class="font-semibold text-lg">ตั้งค่าช่องทางการชำระเงิน</h5>
        </header>
        <div class="section grid md:grid-cols-2 gap-4">
            <div class="col">
                <div class="card bg-white p-4 rounded shadow">  
                    <div class="card-body">
                        <p class="font-semibold mb-3">ช่องทางธนาคาร (สลิป)</p>
                        <form @submit="editBank">
                            <div class="block mb-4">
                                <label class="text-slate-500">ชื่อบัญชีธนาคาร <strong>( ไม่ต้องเติมนาย ให้ใส่ชื่อเว้นวรรคแล้วตามด้วยนามสกุล )</strong></label>
                                <input type="text" v-model="bankName" class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"/>
                            </div>
                            <div class="block mb-4">
                                <label class="text-slate-500">เลขบัญชีธนาคาร <strong>( ไม่ต้องใส่ "-" ให้กรอกเลขอย่างเดียว)</strong></label>
                                <input type="text" v-model="bankAccount" class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"/>
                            </div>
                            <div class="block mb-4">
                                <label class="text-slate-500">ธนาคาร</label>
                                <select class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                                    v-model="bankCode">
                                    <option v-for="item in bankData" :key="item.id" :value="item.id" :selected="item.id === bankCode">
                                        {{ item.value }}
                                    </option>
                                </select>
                            </div>
                            <div class="block">
                                <button title="button" class="w-full bg-[#3f6ad8] py-1.5 px-3 text-white hover:bg-[#5c80de] duration-100 rounded" type="submit">
                                    บันทึกข้อมูล
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        middleware: ["AuthLogin", "AuthAdmin"],
        layout: 'Layouts',
        data() {
            return {
                bankName: null,
                bankAccount: null,
                bankCode: null,
                data: [],
                bankData: [
                    {
                        id: "002",
                        value: "ธนาคารกรุงเทพ"
                    },
                    {
                        id: "004",
                        value: "ธนาคารกสิกรไทย"
                    },
                    {
                        id: "006",
                        value: "ธนาคารกรุงไทย"
                    },
                    {
                        id: "014",
                        value: "ธนาคารไทยพาณิชย์"
                    },
                    {
                        id: "030",
                        value: "ธนาคารออมสิน"
                    },
                    {
                        id: "011_2",
                        value: "ธนาคารทหารไทยธนชาต"
                    }
                ]
            };
        },
        async asyncData({ $axios }) {
            return await $axios.get('/getdata/payment').then(response => {

                const data = response.data.data
                
                return { 
                    bankName: data.bank.name,
                    bankAccount: data.bank.account,
                    bankCode: data.bank.bank.code,
                }
                
            }).catch((error) => {
                const err = error.response.data
                console.log(err)
            });
            
        },
        methods: {
            async editBank(e) {
                e.preventDefault();
                try {
                    if(this.bankName == '' || this.bankAccount == '' || this.bankCode == ''){
                        this.$swal({
                            icon: 'error',
                            title: 'บันทึกข้อมูลไม่สำเร็จ', 
                            text: 'กรุณากรอกข้อมูลให้ครบถ้วน', 
                            confirmButtonText: 'ปิด',
                        });
                        return
                    }else{
                        this.$swal({
                            icon: 'warning',
                            title: 'กำลังบันทึกข้อมูล',
                            showConfirmButton: false,
                            allowOutsideClick: false
                        });
                        await this.$axios.post('/edit/bank', {
                            bankName: this.bankName,
                            bankAccount: this.bankAccount,
                            bankCode: this.bankCode,
                        }).then((response) => {
                            if(response.data.status == 'success'){
                                this.$swal({
                                    icon: 'success',
                                    title: 'บันทึกข้อมูลสำเร็จ', 
                                    confirmButtonText: 'ปิด',
                                    timer: 1500,
                                    timerProgressBar: true
                                })
                                return
                            }
                        }).catch((error) => {
                            const err = error.response.data
                            this.$swal({
                                icon: 'error',
                                title: 'บันทึกข้อมูลไม่สำเร็จ', 
                                text: err.data, 
                                confirmButtonText: 'ปิด',
                            });
                            return
                        });
                    }

                } catch (error) {
                    this.$swal({
                        icon: 'error',
                        title: 'บันทึกข้อมูลไม่สำเร็จ', 
                        text: 'เกิดข้อผิดพลาด', 
                        confirmButtonText: 'ปิด',
                    })
                    return
                }
            }
        }
        
    }
</script>