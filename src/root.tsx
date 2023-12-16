import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  const settings = useSignal({
    dark: true,
  });
  useVisibleTask$(({ track }) => {
    track(() => settings.value);
    console.log("settings.value", settings.value);

    document.body.classList.toggle("dark", settings.value.dark);
  })

  useVisibleTask$(() => {
    if (typeof window.localStorage.getItem("settings") !== "string") {
      window.localStorage.setItem("settings", JSON.stringify(settings.value));
    }

    settings.value = JSON.parse(window.localStorage.getItem("settings") ?? "");
  })

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en" class="dark flex">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
