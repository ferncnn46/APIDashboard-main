<template>
    <div class="mx-auto max-w-xl">
        <div class="border border-slate-300 text-slate-500 p-4 rounded-lg shadow bg-white">
            <p class="text-2xl font-semibold mb-3 text-slate-600">เติมเงิน</p>
            <hr class="my-4 rounded-none h-xp" />
            <div class="title">
                <p class="text-slate-400">ธนาคาร</p>
                <p class="text-xl text-slate-600 font-semibold mb-3">{{ bankData.bank.name }}</p>
                <p class="text-slate-400">เลขบัญชีธนาคาร</p>
                <p class="text-xl text-slate-600 font-semibold mb-3">{{ bankData.account }}</p>
                <p class="text-slate-400">ชื่อบัญชีธนาคาร</p>
                <p class="text-xl text-slate-600 font-semibold mb-3">{{ bankData.name }}</p>
            </div>
            <label class="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300
                border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700
                hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">คลิกเพื่ออัพโหลดสลิปโอนเงิน</span></p>
                </div>
                <input type="file" class="hidden" accept=".jpeg,.jpg,.png,image/jpeg,image/png" name="inputFile" @change="onFileChange"/>
            </label>
        </div>
    </div>
        
</template>
<script>

    import { BrowserQRCodeReader } from '@zxing/browser';

    export default {
        middleware: ["AuthLogin"],
        layout: 'Layouts',
        async asyncData({ $axios }) {
            
            return await $axios.get('/getdata/bank').then(response => {
                const bankData = response.data
                return { bankData }
            }).catch((error) => {
                const err = error.response.data
                console.log(err)
            });

        },
        data() {
            return {
                imageFile: null,
            };
        },
        methods: {
            async onFileChange(e) {
                e.preventDefault();

                const reader = new BrowserQRCodeReader();
                const img = new Image();

                this.imageFile = e.target.files[0];
                
                img.src = URL.createObjectURL(this.imageFile);
                
                img.onload = async () => {
                    try {
                        const result = await reader.decodeFromImageElement(img);
                        const qrDecode = result.text;
                        if(qrDecode !== '' && qrDecode){
                            this.$swal({
                                icon: 'warning',
                                title: 'กำลังเติมเงิน',
                                showConfirmButton: false,
                                allowOutsideClick: false
                            })
                            await this.$axios.post('/topup/slip', {
                                qrCode: qrDecode,
                            }).then((response) => {
                                if(response){
                                    this.$swal({
                                        icon: 'success',
                                        title: 'เติมเงินสำเร็จ', 
                                        confirmButtonText: 'ปิด'
                                    })
                                    
                                }
                            }).catch((error) => {
                                const err = error.response.data
                                this.$swal({
                                    icon: 'error',
                                    title: 'เติมเงินไม่สำเร็จ', 
                                    text: err.data, 
                                    confirmButtonText: 'ปิด'
                                })
                            });
                            const updatedUser = await this.$axios.$get('/auth/me')
                            await this.$auth.setUser(updatedUser.data);
                        }else{
                            this.$swal({
                                icon: 'error',
                                title: 'เติมเงินไม่สำเร็จ', 
                                text: 'เกิดข้อผิดพลาด', 
                                confirmButtonText: 'ปิด',
                            })
                        }
                    } catch (err) {
                        this.$swal({
                            icon: 'error',
                            title: 'เติมเงินไม่สำเร็จ', 
                            text: 'ไม่พบ QrCode', 
                            confirmButtonText: 'ปิด',
                        })
                    }
                };
                
            },
        }
    }
</script>