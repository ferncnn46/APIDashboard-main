<template>
    <div>
        <header class="mb-5">
            <h5 class="font-semibold text-lg">ภาพรวมเว็บไซต์</h5>
        </header>
        <main>
            <canvas ref="graphCanvas"></canvas>
        </main>
    </div>
</template>
<script>

    import Chart from 'chart.js/auto';
    
    export default {
        layout: 'Layouts',
        data() {
            return {
                chartData: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Sales',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            data: [65, 59, 80, 81, 56, 55, 40]
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            };
        },
        mounted(){
            const chart = this.$refs.graphCanvas;
            let barGraph = new Chart(chart, {
                type: 'line',
                data: this.chartData,
            })
        }
    }
</script>