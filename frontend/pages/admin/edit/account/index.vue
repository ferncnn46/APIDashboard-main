<template>
    <div>
        <header class="mb-5">
            <h5 class="font-semibold text-lg">จัดการบัญชีผู้ใช้งาน</h5>
        </header>
        <div class="data-table p-4 bg-white rounded-lg shadow">
            <div class="flex mb-5">
                <div class="ml-auto">
                    <input type="text" placeholder="ค้นหา" v-model="input" @change="onChange" 
                    class="block w-full px-3 py-1 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400"/>
                </div>
            </div>
            <div class="overflow-auto mb-5 whitespace-nowrap">
                <table class="table-auto w-full border-collapse border border-slate-200">
                    <thead class="bg-slate-200">
                        <tr>
                            <th class="p-2 text-left">ไอดี</th>
                            <th class="p-2 text-left">ชื่อผู้ใช้งาน</th>
                            <th class="p-2 text-left">อีเมล</th>
                            <th class="p-2 text-left">ระดับ</th>
                            <th class="p-2 text-left">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="accounts.length == 0">
                            <td colspan="5" class="text-center p-2">ไม่พบข้อมูลที่ต้องการ</td>
                        </tr>
                        <tr v-for="account in accounts" class="border-b border-slate-200">
                            <td class="p-2">{{ account.accountId }}</td>
                            <td class="p-2">{{ account.username }}</td>
                            <td class="p-2">{{ account.email }}</td>
                            <td class="p-2" v-if="account.isAdmin === true">แอดมิน</td>
                            <td class="p-2" v-else>ผู้ใช้งานปกติ</td>
                            <td class="p-2">
                                <NuxtLink :to="{ name: 'admin-edit-account-id', params: { id: account.accountId }}" class="block px-4 duration-100 text-center bg-yellow-400 rounded">
                                    จัดการ
                                </NuxtLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-center items-center">
                <button @click="preventPage()" class="w-7 h-7 flex justify-center items-center bg-slate-300 rounded hover:bg-slate-200 duration-100"><font-awesome-icon :icon="['fas', 'arrow-left']"/></button>
                <p class="mx-4">{{ page }} / {{ totalPages }}</p>
                <button @click="nextPage()" class="w-7 h-7 flex justify-center items-center bg-slate-300 rounded hover:bg-slate-200 duration-100"><font-awesome-icon :icon="['fas', 'arrow-right']"/></button>
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
                input: '',
                page: 1,
                totalPages: 1,
                accounts: []
            };
        },
        async asyncData({ $axios }) {
            const data = await $axios.get('/getdata/account/all?page=1&search=').then((response) => response.data.data).catch((error) => {
                const err = error.response.data
                console.log(err)
            });
            const accounts = data.data
            const totalPages = data.totalPages

            return { accounts, totalPages }
        },
        methods: {
            async onChange(e) {
                if(this.input !== null){
                    if(this.page == 0){
                        this.page = 1
                    }
                    const data = await this.$axios.get('/getdata/account/all?page='+this.page+'&search='+this.input).then((response) => response.data.data).catch((error) => {
                        const err = error.response.data
                        console.log(err)
                    });
                    
                    this.totalPages = data.totalPages
                    if(this.totalPages <= 1){
                        this.page = this.totalPages
                    }
                    this.accounts = data.data
                    
                    
                }
            },
            async nextPage(){
                if(this.page < this.totalPages){
                    this.page = this.page + 1
                    const data = await this.$axios.get('/getdata/account/all?page='+this.page+'&search='+this.input).then((response) => response.data.data).catch((error) => {
                        const err = error.response.data
                        console.log(err)
                    });

                    this.accounts = data.data
                    this.totalPages = data.totalPages
                }
                
            },
            async preventPage(){
                if(this.page > 1){
                    this.page = this.page - 1
                    const data = await this.$axios.get('/getdata/account/all?page='+this.page+'&search='+this.input).then((response) => response.data.data).catch((error) => {
                        const err = error.response.data
                        console.log(err)
                    });

                    this.accounts = data.data
                    this.totalPages = data.totalPages
                }
            }
        }
    }
</script>