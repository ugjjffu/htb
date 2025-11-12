import { NextApiRequest, NextApiResponse } from "next";

// lib/amap-client.ts
const SERVER_KEY   = process.env.AMAP_KEY!;        // 服务端 key
const SERVER_SECRET = process.env.AMAP_SECRET;     // 若开启数字签名
const BASE_URL      = 'https://restapi.amap.com/v3'; // Web 服务根路径

/** 后端：根据关键词获取高德输入提示 */
// lib/amap-client.ts
export default async function getInputTips(req: NextApiRequest, res: NextApiResponse) {
    const keyword = req.query.keyword as string;
    const city = req.query.city as string | undefined;
    console.log(keyword);
    const params = new URLSearchParams({
        key: SERVER_KEY,
        keywords: keyword,
        ...(city && { city }),
    });

    const resp = await fetch(`${BASE_URL}/assistant/inputtips?${params.toString()}`);
    const data = await resp.json(); 
    if (!resp.ok || data.status !== '1') {
        console.error("AMap Error Response:", data);
        throw new Error(`AMap API Error: ${data.info}`);
    }
    console.log(data);
    return res.json(data);   // 直接返回数据
}