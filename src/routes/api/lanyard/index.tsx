import type { RequestHandler } from "@builder.io/qwik-city";
import { LANYARD } from "~/Constants";

export let data: any;

export const onGet: RequestHandler = async (requestEvent) => {
  const response = await fetch(LANYARD);
  data = await response.json();
  requestEvent.json(200, data);
};
