import type { RequestHandler } from "@builder.io/qwik-city";
import { GITHUB } from "~/Constants";

export let data: any;

export const onGet: RequestHandler = async (requestEvent) => {
  const response = await fetch(GITHUB);
  data = await response.json();
  console.log(requestEvent.url.pathname);
  requestEvent.json(200, data);
};
