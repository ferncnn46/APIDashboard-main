<template>
    <div class="mt-12 mx-auto max-w-xl">
        <div class="border border-slate-300 text-slate-500 p-4 rounded-lg shadow bg-white">
            <p class="text-2xl font-semibold mb-3 text-slate-600">เข้าสู่ระบบ</p>
            <hr class="my-4 rounded-none h-xp" />
            <form @submit="login">
                <div class="block mb-4">
                    <label>ชื่อผู้ใช้งาน</label>
                    <input name="username" type="text" v-model="username"  class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    placeholder="ชื่อผู้ใช้งาน"/>
                </div>
                <div class="block mb-4">
                    <label>รหัสผ่าน</label>
                    <input name="password" type="password" v-model="password" class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    placeholder="รหัสผ่าน"/>
                </div>
                <div class="mb-1 text-right">
                    <NuxtLink to="/register" class="text-blue-600 hover:text-blue-400">
                        ลืมรหัสผ่าน?
                    </NuxtLink>
                </div>
                <button title="button" class="w-full py-2 px-4 bg-blue-600 text-white hover:scale-95 hover:bg-blue-500 rounded-md duration-150 mb-3" type="submit">เข้าสู่ระบบ</button>
                <p class="text-center">
                    ยังไม่ได้สมัครสมาชิกใช่ไหม?
                    <NuxtLink to="/register" class="text-blue-600 hover:text-blue-400">
                        สมัครสมาชิก!
                    </NuxtLink>
                </p>
            </form>
            
        </div>
    </div>
        
</template>
<script>
    export default {
        middleware: ["IsLogin"],
        layout: 'Layouts',
        data() {
            return {
                username: '',
                password: '',
            };
        },
        methods: {
            async login(e) {
                e.preventDefault();
                if(this.username == '' || this.password == ''){
                    this.$swal({
                        icon: 'error',
                        title: 'เข้าสู่ระบบไม่สำเร็จ', 
                        text: 'กรุณากรอกข้อมูลให้ครบถ้วน', 
                        confirmButtonText: 'ปิด',
                    });
                }else{
                    try {
                        this.$swal({
                            icon: 'warning',
                            title: 'กำลังเข้าสู่ระบบ',
                            showConfirmButton: false,
                            allowOutsideClick: false
                        })
                        await this.$auth.loginWith('local', { 
                            data: {
                                username: this.username,
                                password: this.password,
                            }
                        }).then((response) => {
                            if(response.data.status == 'success'){
                                this.$swal({
                                    icon: 'success',
                                    title: 'เข้าสู่ระบบสำเร็จ', 
                                    confirmButtonText: 'ปิด',
                                    timer: 1500,
                                    timerProgressBar: true
                                })
                            }
                            
                        }).catch((error) =>{
                            const err = error.response.data
                            this.$swal({
                                icon: 'error',
                                title: 'เข้าสู่ระบบไม่สำเร็จ', 
                                text: err.data, 
                                confirmButtonText: 'ปิด',
                            });
                        });
                    
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
    }
</script>