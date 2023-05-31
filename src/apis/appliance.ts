import { client } from "./client";
import { type Appliance } from "nature-remo";

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
