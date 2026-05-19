export default interface TrafficAccidentVO {
  std_year: string; // 기준 년도
  sido_sgg_nm: string; // 시도시군구명
  acc_cl_nm: string; // 사고분류
  acc_cnt: string; // 사고건수
  dth_dnv_cnt: string; // 사망자수
  injpsn_cnt: string; // 부상자수
  tot_acc_cnt: string; // 총 사고건수
  tot_dth_dnv_cnt: string; // 총 사망자수
  tot_injpsn_cnt: string; // 총 부상자수
}
