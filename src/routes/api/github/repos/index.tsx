import type { RequestHandler } from "@builder.io/qwik-city";
import { GITHUB } from "~/Constants";

export let data: any;

export const onGet: RequestHandler = async (requestEvent) => {
    // get query params
  const response = await fetch(GITHUB + "/repos?per_page=99999");
  data = await response.json();
  console.log(requestEvent.url.pathname);
  requestEvent.json(200, data);
};
