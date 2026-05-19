<template>
  <div class="q-pa-md">
    <traffic-filter />
    <!-- 데이터 조회 확인용-->
    {{ trafficAccidentDataList }}
  </div>
</template>
<script setup lang="ts">
import TrafficFilter from 'src/components/TrafficFilter.vue';
import { useTrafficAccidentStore } from 'src/stores/useTrafficAccidentStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const trafficAccidentStore = useTrafficAccidentStore();

const { trafficAccidentData } = storeToRefs(trafficAccidentStore);

const trafficAccidentDataList = computed(() => {
  return trafficAccidentData.value;
});
</script>
