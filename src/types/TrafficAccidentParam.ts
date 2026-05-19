export default interface TrafficAccidentParam {
  searchYearCd: string; // 검색 년도
  siDo: string; // 시도 코드
  guGun: string; // 구군 코드
  type: 'json' | 'xml'; // 응답 데이터 타입
  //   numOfRows: number; // 한 페이지 결과 수
  //   pageNo: number; // 페이지 번호
}
