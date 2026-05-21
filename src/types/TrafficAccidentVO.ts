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
  acc_cnt_cmrt: string; // 사고건수 구성비
  dth_dnv_cnt_cmrt: string; // 사망자수 구성비
  ftlt_rate: string; // 치사율
  injpsn_cnt_cmrt: string; // 부상자수 구성비
  pop_100k: string; // 인구 10만명당 사고건수
  car_10k: string; // 자동차 1만대당 사고건수
  cnt_027_01: string; // 과속 사고건수
  cnt_027_02: string; // 중앙선침범 사고건수
  cnt_027_03: string; // 신호위반 사고건수
  cnt_027_04: string; // 안전거리미확보 사고건수
  cnt_027_05: string; // 안전운전의무불이행 사고건수
  cnt_027_06: string; // 교차로통행방법위반 사고건수
  cnt_027_07: string; // 보행자보호의무위반 사고 건수
  cnt_027_99: string; // 기타 사고건수
  cnt_014_01: string; // 차대사람 사고건수
  cnt_014_02: string; // 차대차 사고건수
  cnt_014_03: string; // 차량단독 사고건수
  cnt_014_04: string; // 철길건널목 사고건수
}
