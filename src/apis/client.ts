import { type Appliance } from "nature-remo";

const ENDPOINT = import.meta.env.VITE_ENDPOINT ?? "https://api.nature.global";

export async function getAppliances(): Promise<Appliance[]> {
  const resp = await fetch(ENDPOINT + "/appliances", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN ?? "foo"}`,
    },
  });

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  // TODO: use zod to validate response body
  const apps = await resp.json();
  return apps;
}
