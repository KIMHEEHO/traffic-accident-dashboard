<template>
  <div class="q-pa-md">
    <traffic-filter class="q-mb-lg" />
    <div class="text-subtitle1">전체 사고 현황</div>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card class="chart-card">
          <q-card-section>
            <accident-trend-chart />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="chart-card">
          <q-card-section>
            <traffic-viloation-chart />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="chart-card">
          <q-card-section>
            <accident-type-chart />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-lg">
      <div class="col-12">
        <q-card class="chart-card">
          <q-card-section>
            <div class="text-subtitle1">사고 유형 상세 분석</div>
            <accident-detail-filter />
          </q-card-section>
        </q-card>
      </div>

      <div v-for="type in selectedTypes" :key="type" class="col-12 col-md-4">
        <q-card class="chart-card">
          <q-card-section>
            <accident-detail-chart :type="type" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TrafficFilter from 'src/components/dashboard/filter/TrafficFilter.vue';
import AccidentTrendChart from 'src/components/dashboard/chart/AccidentTrendChart.vue';
import AccidentTypeChart from 'src/components/dashboard/chart/AccidentTypeChart.vue';
import TrafficViloationChart from 'src/components/dashboard/chart/TrafficViloationChart.vue';
import AccidentDetailFilter from 'src/components/dashboard/filter/AccidentDetailFilter.vue';
import AccidentDetailChart from 'src/components/dashboard/chart/AccidentDetailChart.vue';
import { useDashboardStore } from 'src/stores/useDashboardStore';
import { storeToRefs } from 'pinia';

const dashboardStore = useDashboardStore();
const { selectedTypes } = storeToRefs(dashboardStore);
</script>

<style scoped>
.chart-card {
  height: 100%;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-4px);
}
</style>
