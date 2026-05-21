<template>
  <div class="q-pa-md">
    <traffic-filter />
    <accident-trend-chart />
  </div>
</template>
<script setup lang="ts">
import TrafficFilter from 'src/components/TrafficFilter.vue';
import AccidentTrendChart from 'src/components/dashboard/AccidentTrendChart.vue';
</script>
