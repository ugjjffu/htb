export async function getCurrentLngLat(): Promise<{ lng: number; lat: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('您的浏览器不支持定位'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { longitude: lng, latitude: lat } = pos.coords;
        alert(lng+" "+lat);
        resolve({ lng, lat });
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  });
}

// Amap Reverse Geocoding Response
export interface AmapRegeoResponse {
  status: string; // "1" means success
  info: string;   // e.g. "OK"
  infocode: string;
  regeocode?: {
    formatted_address: string;
    addressComponent: {
      province: string;
      city: string | string[];
      district: string;
      township: string;
      streetNumber?: {
        street: string;
        number: string;
      };
    };
  };
}

export async function getAreaFromLatLng(
  lat: number,
  lng: number,
  apiKey: string
): Promise<AmapRegeoResponse> {
  const url = `https://restapi.amap.com/v3/geocode/regeo?location=${lng},${lat}&key=${apiKey}&radius=1000&extensions=all`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Amap API error: ${res.statusText}`);
  }

  const data: AmapRegeoResponse = await res.json();
  return data;
}

