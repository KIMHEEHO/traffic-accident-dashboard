export type SiDoCode = '1100' | '4100';

export const siDoList: { name: string; code: SiDoCode }[] = [
  { name: '서울', code: '1100' },
  { name: '경기', code: '4100' },
];

export const guGunMap: Record<SiDoCode, { name: string; code: string }[]> = {
  '1100': [
    { name: '종로구', code: '1111' },
    { name: '중구', code: '1112' },
    { name: '용산구', code: '1113' },
    { name: '성동구', code: '1114' },
    { name: '광진구', code: '1115' },
    { name: '동대문구', code: '1116' },
    { name: '중랑구', code: '1117' },
    { name: '성북구', code: '1118' },
    { name: '강북구', code: '1119' },
    { name: '도봉구', code: '1120' },
    { name: '노원구', code: '1121' },
    { name: '은평구', code: '1122' },
    { name: '서대문구', code: '1123' },
    { name: '마포구', code: '1124' },
    { name: '양천구', code: '1125' },
    { name: '강서구', code: '1126' },
    { name: '구로구', code: '1127' },
    { name: '금천구', code: '1128' },
    { name: '영등포구', code: '1129' },
    { name: '동작구', code: '1130' },
    { name: '관악구', code: '1131' },
    { name: '서초구', code: '1132' },
    { name: '강남구', code: '1133' },
    { name: '송파구', code: '1134' },
    { name: '강동구', code: '1135' },
  ],
  '4100': [
    { name: '수원시', code: '4111' },
    { name: '성남시', code: '4113' },
  ],
};
