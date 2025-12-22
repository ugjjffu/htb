import { NextApiRequest, NextApiResponse } from "next";
// lib/amap-client.ts
const SERVER_KEY = process.env.AMAP_KEY!;
const SERVER_SECRET = process.env.AMAP_SECRET;
const BASE_URL = 'https://restapi.amap.com/v3';

/** 后端：获取某城市推荐酒店
 *  GET /api/hotels?city=北京&page=1&pageSize=10
 */
interface HotelItem {
  name: string;
  rating: string;
  star: number;
}
export default async function getCityHotels(req: NextApiRequest, res: NextApiResponse) {
  const city = req.query.city as string;
  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 10);

  if (!city) {
    return res.status(400).json({ error: '缺少 city 参数' });
  }

  const params = new URLSearchParams({
    key: SERVER_KEY,
    types: '100100|100101|100102|100103|100104|100105',        // 090000 对应“住宿服务-酒店”
    city: city,
    citylimit: 'true',      // 只返回指定城市
    offset: String(pageSize),
    page: String(page),
    extensions: 'all',      // 返回详细信息（含评分、价格区间等）   
  });

  const url = `${BASE_URL}/place/text?${params.toString()}`;
  const resp = await fetch(url);
  const data = await resp.json();
  const list: HotelItem[] = data.pois.map((p: any) => {
    const starCode: string = p.typecode ?? '';
    const starMap: Record<string, number> = {
      '100102': 5,
      '100103': 4,
      '100104': 3,
      '100105': 2,
      '100101': 0, // 豪华未评星
      '100201': 0, // 经济型
    };
    const star: number = starMap[starCode] ?? 0;

    return {
      name: p.name,
      rating: p.biz_ext?.rating || '0',
      star,
      photos: p.photos,
    };
  });
  list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0,6);
  // console.log(JSON.stringify(list));
  if (!resp.ok || data.status !== '1') {
    console.error('AMap hotels error:', data);
    return res.status(500).json({ error: `AMap API: ${data.info}` });
  }

  // 可按需再裁剪字段
  return res.json(data);
}