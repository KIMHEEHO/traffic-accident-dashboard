export default async function handler(req, res) {
  const { searchYearCd, siDo, guGun, type } = req.query;

  const url =
    `http://apis.data.go.kr/B552061/lgStat/getRestLgStat` +
    `?serviceKey=${process.env.SERVICE_KEY}` +
    `&searchYearCd=${searchYearCd}` +
    `&siDo=${siDo}` +
    `&guGun=${guGun}` +
    `&type=${type}` +
    `&numOfRows=20&pageNo=1`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
