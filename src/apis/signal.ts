import { client } from "./client";

export async function sendSignal(id: string) {
  const resp = await client.fetch(`signals/${id}/send`, {
    method: "POST",
  });

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  return resp.json();
}
