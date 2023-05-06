<template>
    <div>
        <nav class="sidebar w-72 min-h-full bg-[#3f6ad8] absolute lg:left-0 top-0 lg:fixed lg:block z-10 duration-300" :class="isOpen ? 'left-0': '-left-72'">
            <div class="sidebar-head flex items-center h-16 px-5 font-bold bg-[#5279dc] text-white text-lg tracking-wider drop-shadow-md">
                <p>SlipVerify</p>
                <button type="button" title="button" class="sidebar-toggle lg:hidden ml-auto" @click="open">
                    <font-awesome-icon class="text-2xl" :icon="['fas', 'bars']"/>
                </button>
            </div>
            <div class="sidebar-body overscroll-hidden py-8">
                <ul>
                    <!-- User Zone -->
                    <li class="sidebar_section mb-5">
                        <NuxtLink to="/" class="block px-8 py-2.5 text-slate-100/50 hover:text-slate-100 hover:bg-[#5c80de] text-left duration-100">
                            <font-awesome-icon :icon="['fas', 'house']"/> หน้าแรก
                        </NuxtLink>
                    </li>
                    
                    <!-- Admin Zone -->
                    <li class="sidebar_section mb-5" v-if="this.$auth.loggedIn && $auth.user.isAdmin == true">
                        <p class="px-5 text-white mb-2 font-bold">เมนูแอดมิน</p>
                        <NuxtLink to="/admin/dashboard" class="block px-8 py-2.5 text-slate-100/50 hover:text-slate-100 hover:bg-[#5c80de] text-left duration-100">
                            ภาพรวมเว็บไซต์
                        </NuxtLink>
                        <NuxtLink to="/admin/edit/account" class="block px-8 py-2.5 text-slate-100/50 hover:text-slate-100 hover:bg-[#5c80de] text-left duration-100">
                            ข้อมูลผู้ใช้งาน
                        </NuxtLink>
                        <NuxtLink to="/admin/edit/payment" class="block px-8 py-2.5 text-slate-100/50 hover:text-slate-100 hover:bg-[#5c80de] text-left duration-100">
                            ข้อมูลช่องทางการชำระเงิน
                        </NuxtLink>

                    </li>
                    
                    <!-- Requried Login Zone -->
                    <li class="sidebar_section mb-5" v-if="this.$auth.loggedIn">
                        <p class="px-5 text-white mb-2 font-bold">บัญชีผู้ใช้งาน</p>
                        <NuxtLink to="/tutorial" class="block px-8 py-2.5 text-slate-100/50 hover:text-slate-100 hover:bg-[#5c80de] text-left duration-100">
                            <font-awesome-icon :icon="['fas', 'file-code']"/> คู่มือการใช้งาน
                        </NuxtLink>
                        <NuxtLink to="/topup" class="block px-8 py-2.5 text-slate-100/50 hover:text-slate-100 hover:bg-[#5c80de] text-left duration-100">
                            <font-awesome-icon :icon="['fas', 'wallet']"/> เติมเงิน
                        </NuxtLink>
                        <NuxtLink to="/account" class="block px-8 py-2.5 text-slate-100/50 hover:text-slate-100 hover:bg-[#5c80de] text-left duration-100">
                            <font-awesome-icon :icon="['fas', 'user']"/> บัญชีผู้ใช้งาน
                        </NuxtLink>
                        <button type="button" title="button" class="w-full py-2.5 px-8 bg-red-600 text-white hover:bg-red-500 text-left duration-150" 
                        @click="logout"><font-awesome-icon :icon="['fas', 'right-to-bracket']"/> ออกจากระบบ</button>
                    </li>

                    
                </ul>
            </div>
        </nav>
        <div class="lg:ml-72 bg-slate-100 min-h-screen overscroll-auto">
            <nav class="flex items-center h-16 px-5 font-bold bg-white tracking-wider drop-shadow-md">
                <button type="button" title="button" class="sidebar-toggle lg:hidden" @click="open">
                    <font-awesome-icon class="text-2xl" :icon="['fas', 'bars']"/>
                </button>
                <div v-if="this.$auth.loggedIn" class="dropdown flex items-center py-1 mx-4 ml-auto cursor-default">
                    <div class="text-3xl text-slate-400 mr-3">
                        <font-awesome-icon :icon="['fas', 'circle-user']"/>
                    </div>
                    <div class="text-left">
                        <p class="text-slate-400">{{ $auth.user.username }}</p>
                        <p class="text-sm max-w-fit px-3 py-0.5 bg-blue-600 text-white rounded">฿ {{ $auth.user.point.toLocaleString() }}</p>
                    </div>
                </div>
                <div v-else class="ml-auto">
                    <NuxtLink to="/login">
                        <button type="button" title="button" class="w-full py-2 px-4 bg-blue-600 text-white hover:scale-95 hover:bg-blue-500 rounded-md duration-150"><font-awesome-icon :icon="['fas', 'right-to-bracket']"/> เข้าสู่ระบบ</button>
                    </NuxtLink>
                </div>
            </nav>
            <div class="flex flex-col min-h-screen">
                <div class="grow main p-6 lg:p-10 text-slate-600">
                    <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
                </div>
                <UserFooter class="flex-none" />
            </div>
        </div>
    </div>
</template>
<script>

export default {
        data() {
            return {
                isOpen: false
            };
        },
        methods: {
            async open() {
                this.isOpen = !this.isOpen
            },
            async logout() {
                await this.$auth.logout().then(() => {
                    this.$swal({
                        icon: 'success',
                        title: 'ออกจากระบบสำเร็จ', 
                        confirmButtonText: 'ปิด',
                        timer: 1500,
                        timerProgressBar: true
                    }).then(() => {
                        this.$router.push('/');
                    }) 
                })
            }
        },
        mounted() {
            document.addEventListener('click', this.closeDropdown);
            
        },
        beforeDestroy() {
            document.removeEventListener('click', this.closeDropdown);
        },
    }

</script>