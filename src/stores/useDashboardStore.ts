import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDashboardStore = defineStore('dashboard', () => {
  const selectedTypes = ref<string[]>([]);

  const toggleType = (val: string) => {
    const idx = selectedTypes.value.indexOf(val);

    if (idx > -1) {
      selectedTypes.value.splice(idx, 1);
    } else if (selectedTypes.value.length < 3) {
      selectedTypes.value.push(val);
    }
  };

  return {
    selectedTypes,
    toggleType,
  };
});
