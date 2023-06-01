import { client } from "./client";
import type {
  AirconSettingsWithTimestamp,
  UpdateAirconSettingsOptions,
} from "nature-remo";

export function toUpdateSettings(
  settings: AirconSettingsWithTimestamp
): UpdateAirconSettingsOptions {
  return {
    temperature: settings.temp,
    operation_mode: settings.mode,
    air_volume: settings.vol,
    air_direction: settings.dir,
    button: settings.button,
  };
}

export async function updateAirconSettings(
  id: string,
  settings: UpdateAirconSettingsOptions
) {
  const form = new FormData();
  for (const [key, val] of Object.entries(settings)) {
    form.set(key, val);
  }

  const resp = await client.fetch(`appliances/${id}/aircon_settings`, {
    method: "POST",
    body: form,
  });

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  return resp.json();
}
