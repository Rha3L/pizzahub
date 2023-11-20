import { GeoLocationProps } from "../types";

export async function getAddress({ latitude, longitude }: GeoLocationProps) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

export function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
