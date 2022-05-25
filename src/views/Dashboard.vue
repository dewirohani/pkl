<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 row">
      <div class="col-lg-7">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart
            id="chart-line"
            title="Gradient Line Chart"
            description="<i class='fa fa-arrow-up text-dark'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
            :chart="{
              labels: [
                'RPL',
                'MM',
                'TBS',
                'TBG',
                'TKK',
                'AP',
                'DF',
                
              ],
              datasets: [
                {
                  label: 'Data Siswa XI',
                  data: [70, 60, 65, 35, 32, 37, 25],
                },  
              ],
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";

export default {
  name: "dashboard-default",
  data() {
  
  },
  components: {
    GradientLineChart,
    
  },
};
</script>
