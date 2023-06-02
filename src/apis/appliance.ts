import { client } from "./client";
import { type Appliance } from "nature-remo";

export async function getAppliances(): Promise<Appliance[]> {
  const resp = await client.fetch("appliances");

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  // TODO: use zod to validate response body
  const apps = await resp.json();
  return apps;
}
