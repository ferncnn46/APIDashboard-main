<template>
    <!-- <h1>Posts page id {{this.$route.params}}</h1> -->
    <div>
        <header class="mb-4">
            <NuxtLink to="/admin/edit/account" class="flex justify-center items-center py-1 px-4 duration-100 text-center bg-yellow-400 hover:bg-yellow-500 rounded mb-5">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2"/> กลับหน้าจัดการ
            </NuxtLink>
            <h5 class="font-semibold text-lg">จัดการบัญชีผู้ใช้งาน</h5>
            <p class="text-slate-400">ไอดี {{this.$route.params.id}}</p>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-white rounded-lg shadow">
                <p class="font-semibold">ข้อมูลบัญชี</p>
                <hr class="my-3 rounded-none h-xp" />
                <div class="input-group mb-3">
                    <label class="font-semibold">ชื่อผู้ใช้งาน</label>
                    <input type="text" v-model=accounts.username class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400" disabled/>
                </div>
                <div class="input-group mb-3">
                    <label class="font-semibold">อีเมล</label>
                    <input type="text" v-model=accounts.email class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400" disabled/>
                </div>
                <form @submit="editAccount">
                    <div class="input-group mb-3">
                        <label class="font-semibold">ยอดเงินคงเหลือ</label>
                        <input type="number" v-model=point class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"/>
                    </div>
                    <div class="input-group mb-3">
                        <label class="font-semibold">ระดับ</label>
                        <select class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                            v-model="role">
                            <option :value="true" :selected="role === true">
                                แอดมิน
                            </option>
                            <option :value="false" :selected="role === false">
                                ผู้ใช้งานปกติ
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
            <div class="p-4 bg-white rounded-lg shadow">
                <p class="font-semibold">รายละเอียดคีย์</p>
                <hr class="my-3 rounded-none h-xp" />
                <div v-if="license !== 'Null'">
                    <div class="input-group mb-3">
                        <label class="font-semibold">คีย์ API</label>
                        <input type="text" v-model=license class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400" disabled/>
                    </div>
                    <form @submit="editPlan">
                        <div class="input-group mb-3">
                            <label class="font-semibold">แพลน</label>
                            <select class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                                v-model="plan">
                                <option v-for="item in payloadPlan" :value="item.plan" :selected="item.plan === plan">
                                    {{ item.plan }} ( {{ item.name }} )
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
                <div v-else>
                    <div class="block">
                        <button @click="generate()" title="button" class="w-full bg-[#3f6ad8] py-1.5 px-3 text-white hover:bg-[#5c80de] duration-100 rounded" type="button">
                            Generate API Key
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        middleware: ["AuthLogin"],
        layout: 'Layouts',
        data() {
            return {
                accounts: [],
                license: null,
                licenseid: 0,
                plan: null,
                role: null,
                point: 0,
                payloadPlan:[
                    { 
                        name: "ยังไม่ได้รับอนุญาต / ระงับการใช้งานชั่วคราว",
                        plan: "NotAllow"
                    },
                    { 
                        name: "1 บาท / สลิป",
                        plan: "Basic"
                    },
                    { 
                        name: "0.5 บาท / สลิป",
                        plan: "Pro"
                    },
                    { 
                        name: "ใช้ฟรี",
                        plan: "Premium"
                    },
                ]
            };
        },
        async asyncData({ $axios, params }) {
            const data = await $axios.get('/getdata/account?id='+params.id).then((response) => response.data.data).catch((error) => {
                const err = error.response.data
                console.log(err)
            });
            const accounts = data.account
            const licenseid = data.license.licenseid
            const license = data.license.license
            const plan = data.license.plan
            const role = data.account.isAdmin
            const point = data.account.point

            return { role,accounts,license,point,plan,licenseid }
        },
        methods: {
            async editAccount() {
                e.preventDefault();
                try {
                    if(this.role == '' || this.point == ''){
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
                        await this.$axios.post('/edit/account', {
                            role: this.role,
                            point: this.point,
                            id: this.$route.params.id
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
            },
            async editPlan(e) {
                e.preventDefault();
                try {
                    if(this.plan == ''){
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
                        await this.$axios.post('/edit/plan', {
                            plan: this.plan,
                            id: this.licenseid
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
            },
            async generate(){
                try {
                    this.$swal({
                        icon: 'warning',
                        title: 'กำลังสร้างคีย์',
                        showConfirmButton: false,
                        allowOutsideClick: false
                    });
                    await this.$axios.post('/generate/key', {
                        id: this.$route.params.id
                    }).then((response) => {
                        if(response.data.status == 'success'){
                            this.$swal({
                                icon: 'success',
                                title: 'สร้างคีย์สำเร็จ', 
                                confirmButtonText: 'ปิด'
                            })
                            return
                        }
                        
                    }).catch((error) => {
                        const err = error.response.data
                        this.$swal({
                            icon: 'error',
                            title: 'สร้างคีย์ไม่สำเร็จ', 
                            text: err.data, 
                            confirmButtonText: 'ปิด',
                        });
                        return
                    });

                    const data = await this.$axios.get('/getdata/account?id='+this.$route.params.id).then((response) => response.data.data).catch((error) => {
                        const err = error.response.data
                        console.log(err)
                    });
                    this.license = data.license.license
                    this.licenseid = data.license.licenseid
                    this.plan = data.license.plan
                } catch (error) {
                    console.log(error)
                    this.$swal({
                        icon: 'error',
                        title: 'สร้างคีย์ไม่สำเร็จ',
                        text: 'เกิดข้อผิดพลาด', 
                        confirmButtonText: 'ปิด',
                    })
                    return
                }
            }
        }
    }
</script>