import type { Appliance, Device } from "nature-remo";

const ENDPOINT = import.meta.env.VITE_ENDPOINT ?? "https://api.nature.global";

const AuthnHeader = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN ?? "foo"}`,
  },
};

export async function getAppliances(): Promise<Appliance[]> {
  const resp = await fetch(ENDPOINT + "/appliances", AuthnHeader);

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  // INFO: 500ms delay to show loading indicator
  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: use zod to validate response body
  const apps = await resp.json();
  return apps;
}

export async function getDevices(): Promise<Device[]> {
  const resp = await fetch(ENDPOINT + "/devices", AuthnHeader);

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: use zod to validate response body
  const devices = await resp.json();
  return devices;
}
