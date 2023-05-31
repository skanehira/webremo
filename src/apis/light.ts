import { client } from "./client";

export async function sendButton(id: string, button: string) {
  const form = new FormData();
  form.set("button", button);

  const resp = await client.fetch(`appliances/${id}/light`, {
    method: "POST",
    body: form,
  });

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  return resp.json();
}

