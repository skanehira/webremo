import type { Appliance, Device } from "nature-remo";

type Headers = {
  [key: string]: string;
};

class Client {
  endpoint: string;
  headers: Headers;

  constructor() {
    this.endpoint =
      import.meta.env.VITE_ENDPOINT ?? "https://api.nature.global";
    this.headers = {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN ?? "foo"}`,
    };
  }

  fetch(path: string, init?: RequestInit) {
    if (init?.headers) {
      Object.assign(init.headers, this.headers);
    }
    return fetch(`${this.endpoint}/${path}`, {
      headers: this.headers,
      ...init,
    });
  }

  get(path: string) {
    return fetch(`${this.endpoint}/${path}`, {
      headers: this.headers,
    });
  }
}

export const client = new Client();

export async function getAppliances(): Promise<Appliance[]> {
  const resp = await client.get("appliances");

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
  const resp = await client.get("devices");

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: use zod to validate response body
  const devices = await resp.json();
  return devices;
}
