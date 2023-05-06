<template>
    <div class="mt-12 mx-auto max-w-xl">
        <div class="border border-slate-300 text-slate-500 p-4 rounded-lg shadow bg-white">
            <p class="text-2xl font-semibold mb-3 text-slate-600">สมัครสมาชิก</p>
            <hr class="my-4 rounded-none h-xp" />
            <form @submit="register">
                <div class="block mb-4">
                    <label>ชื่อผู้ใช้งาน</label>
                    <input name="username" type="text" v-model="username" class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    placeholder="ชื่อผู้ใช้งาน"/>
                </div>
                <div class="block mb-4">
                    <label>อีเมล</label>
                    <input name="email" type="text" v-model="email" class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    placeholder="อีเมล"/>
                </div>
                <div class="block mb-4">
                    <label>รหัสผ่าน</label>
                    <input name="password" type="password" v-model="password" class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    placeholder="รหัสผ่าน"/>
                </div>
                <div class="block mb-4">
                    <label>รหัสผ่านยืนยัน</label>
                    <input name="repassword" type="password" v-model="repassword" class="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    placeholder="รหัสผ่านยืนยัน"/>
                </div>
                <button title="button" class="w-full py-2 px-4 bg-blue-600 text-white hover:scale-95 hover:bg-blue-500 rounded-md duration-150 mb-3" type="submit">สมัครสมาชิก</button>
                <p class="text-center">
                    มีบัญชีอยู่แล้ว?
                    <NuxtLink to="/login" class="text-blue-500 hover:text-blue-400">
                        เข้าสู่ระบบเลย!
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
                email: '',
                password: '',
                repassword:  ''
            };
        },
        methods: {
            async register(e) {
                e.preventDefault();
                if(this.username == '' || this.email == '' || this.password == '' || this.repassword == ''){
                    this.$swal({
                        icon: 'error',
                        title: 'สร้างบัญชีไม่สำเร็จ', 
                        text: 'กรุณากรอกข้อมูลให้ครบถ้วน', 
                        confirmButtonText: 'ปิด',
                    });
                }else{
                    try {
                        this.$swal({
                            icon: 'warning',
                            title: 'กำลังสร้างบัญชี...',
                            showConfirmButton: false,
                            allowOutsideClick: false
                        })
                        await this.$axios.post('/auth/register', {
                            username: this.username,
                            email: this.email,
                            password: this.password,
                            repassword: this.repassword
                        }).then(() => {
                            this.$swal({
                                icon: 'success',
                                title: 'สร้างบัญชีสำเร็จ ระบบกำลังพาท่านไปหน้าเข้าสู่ระบบ', 
                                confirmButtonText: 'ปิด',
                                timer: 1500,
                                timerProgressBar: true
                            }).then(() =>{
                                this.$router.push('/login');
                            })
                        }).catch((error) => {
                            const err = error.response.data
                            this.$swal({
                                icon: 'error',
                                title: 'สร้างบัญชีไม่สำเร็จ', 
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