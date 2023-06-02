import type { Device } from "nature-remo";
import { client } from "./client";

export async function getDevices(): Promise<Device[]> {
  const resp = await client.fetch("devices");

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  // TODO: use zod to validate response body
  const devices = await resp.json();
  return devices;
}
