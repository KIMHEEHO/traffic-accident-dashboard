export default async function handler(req, res) {
  try {
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

    const text = await response.text(); // 👈 핵심

    res.status(200).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}
