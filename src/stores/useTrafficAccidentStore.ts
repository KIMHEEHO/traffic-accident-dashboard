import axios from 'axios';
import { defineStore } from 'pinia';
import type TrafficAccidentParam from 'src/types/TrafficAccidentParam';
import envConfig from 'src/config/envConfig';
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
        const url = `${TrafficAccidentApi.GET_TRAFFIC_ACCIDENT_DATA}?serviceKey=${envConfig.SERVICE_KEY}&searchYearCd=${params.searchYearCd}&siDo=${params.siDo}&guGun=${params.guGun}&type=${params.type}&numOfRows=20&pageNo=1`;

        const res = await axios.get(url);

        this.trafficAccidentData = res.data.items.item;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
