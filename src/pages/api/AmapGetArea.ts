import { NextApiRequest, NextApiResponse } from "next";
import { AmapRegeoResponse } from "@/../utils/geo";
// lib/amap-client.ts
const SERVER_KEY = process.env.AMAP_GEOCODING_KEY||"";
const BASE_URL = 'https://restapi.amap.com/v3';

/** 后端：获取某城市推荐酒店
 *  GET /api/hotels?city=北京&page=1&pageSize=10
 */
// interface HotelItem {
//   name: string;
//   rating: string;
//   star: number;
// }
export default async function get_GEODECODING_RESULT(req: NextApiRequest, res: NextApiResponse) {
  const lng = req.query.lng as string;
  const lat = req.query.lat as string;
//   console.log("654");
  const data=await getAreaFromLatLng(lat,lng,SERVER_KEY);
  return res.json(data);
}

export async function getAreaFromLatLng(
  lat: string,
  lng: string,
  apiKey: string
): Promise<AmapRegeoResponse> {
  const url = `https://restapi.amap.com/v3/geocode/regeo?location=${lng},${lat}&key=${apiKey}&radius=1000&extensions=all`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Amap API error: ${res.statusText}`);
  }
  const data: AmapRegeoResponse = await res.json();
  console.log('654321'+JSON.stringify(data));
  return data;
}
