import axios from 'axios';
import { defineStore } from 'pinia';
import type TrafficAccidentParam from 'src/types/TrafficAccidentParam';
import type TrafficAccidentVO from 'src/types/TrafficAccidentVO';

export const TrafficAccidentApi = {
  GET_TRAFFIC_ACCIDENT_DATA: 'http://apis.data.go.kr/B552061/lgStat/getRestLgStat',
};

export const useTrafficAccidentStore = defineStore('useTrafficAccidentStore', {
  state: () => ({
    trafficAccidentData: [] as TrafficAccidentVO[],
  }),

  actions: {
    async getTrafficAccidentData(params: TrafficAccidentParam) {
      try {
        const res = await axios.get('/api/traffic', {
          params: {
            searchYearCd: params.searchYearCd,
            siDo: params.siDo,
            guGun: params.guGun,
            type: params.type,
          },
        });

        if (res.data.resultCode === '03') {
          this.trafficAccidentData = [];
          return 'NO_DATA';
        }

        this.trafficAccidentData = res.data.items.item;
        return 'SUCCESS';
      } catch (error) {
        console.error(error);
        return 'ERROR';
      }
    },
  },
});
