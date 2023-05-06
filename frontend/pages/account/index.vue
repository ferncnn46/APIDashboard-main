<template>
    <div>
        <div class="card border rounded-lg shadow p-4 bg-white mb-5">
            <div class="card-header">
               <h5 class="font-semibold text-lg">บัญชีผู้ใช้งาน</h5> 
            </div>
            <hr class="my-4 rounded-none h-xp" />
            <div class="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="card-section">
                    <p class="font-semibold">ชื่อผู้ใช้งาน</p>
                    <input type="text" v-model=$auth.user.username class="mt-1 block w-full px-3 py-2 bg-slate-50 text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400" disabled/>
                </div>
                <div class="card-section">
                    <p class="font-semibold">อีเมล</p>
                    <input type="text" v-model=$auth.user.email class="mt-1 block w-full px-3 py-2 bg-slate-50 text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400" disabled/>
                </div>
            </div>
        </div>
        <div class="card border rounded-lg shadow p-4 bg-white mb-5">
            <div class="card-header">
               <h5 class="font-semibold text-lg">รายละเอียดคีย์</h5> 
            </div>
            <hr class="my-4 rounded-none h-xp" />
            <div class="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="card-section">
                    <p class="font-semibold">คีย์ API</p>
                    <input type="text" v-model="licenseData.license" class="mt-1 block w-full px-3 py-2 bg-slate-50 text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400" disabled/>
                </div>
                <div class="card-section">
                    <p class="font-semibold">แพลน</p>
                    <input type="text" v-model=licenseData.plan class="mt-1 block w-full px-3 py-2 bg-slate-50 text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400" disabled/>
                </div>
            </div>
        </div>
        <div class="card border rounded-lg shadow p-4 bg-white">
            <div class="card-header">
               <h5 class="font-semibold text-lg">ข้อมูลการใช้งาน</h5> 
            </div>
            <hr class="my-4 rounded-none h-xp" />
        </div>
    </div>
        
</template>
<script>
    export default {
        middleware: ["AuthLogin"],
        layout: 'Layouts',
        data() {
            return {
                plan: 'Basic',
                license: '8d6de3e1-de26-4ce5-8a1b-c7d717e04a08'
            };
        },
        async asyncData({ $axios }) {
            
            return await $axios.get('/getdata/license').then(response => {
                const licenseData = response.data.data

                return { licenseData }
            }).catch((error) => {
                const err = error.response.data
                console.log(err)
            });

        },
    }
</script>