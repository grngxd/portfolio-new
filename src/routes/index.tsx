import { Signal, component$, createContextId, useContextProvider, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Home from "~/components/home/Home";
import Cursor from "~/components/misc/Cursor";
import Navbar from "~/components/navbar/Navbar";


export const SelectedPageCtx = createContextId<Signal<any>>(
  'grng.selectedpage'
);

export const API_CTX = createContextId<Signal<any>>(
  'grng.api'
);


export default component$(() => {
  const selectedPage : Signal<any> = useSignal(Home as any) // use the component function
  useContextProvider(SelectedPageCtx, selectedPage)

  useVisibleTask$(({ track }) => {
    track(() => selectedPage.value)
    console.log('selectedPage.value', selectedPage.value)
  })

  const github : Signal = useSignal({})
  const lanyard : Signal = useSignal({})

  const info = useStore({
    "value": {
      "github": github,
      "lanyard": lanyard,
    }
  })
  useContextProvider(API_CTX, info)

  const apisLoaded = useSignal(false)

  useVisibleTask$(({ track }) => {
    track(() => info.value)
    console.log('github.value', info.value.github.value)
  })

  useVisibleTask$(async () => {
    const fetchAPIs = async () => {
      await fetch("/api/github")
      .then((res) => res.json())
      .then((data) => github.value = data)
      .then((data) => info.value.github.value = data)
      //.then((data) => {document.title = `${data.name} | ${data.bio}`});
  
      document.title = `${info.value.github.value.name || "grng"} | ${info.value.github.value.bio || "bedroom programmer"}`
  
      await fetch("/api/lanyard")
      .then((res) => res.json())
      .then((data) => lanyard.value = data)
      .then((data) => info.value.lanyard.value = data)
    }

    await fetchAPIs();
    apisLoaded.value = true;
  })

  useVisibleTask$(({ track }) => {
    track(() => apisLoaded.value)

    console.log('info.github.value', info.value.github.value)
  })

  return (
    <>
      <Cursor />
      <Navbar />
      <selectedPage.value/>
    </>
  );
});

export const head: DocumentHead = {
  title: "...",
  // meta: [
  //   {
  //     name: 'description',
  //     content: 'This is the about page',
  //   },
  //   {
  //     property: 'og:title',
  //     content: 'About page',
  //   },
  //   {
  //     property: 'og:description',
  //     content: 'This is the about page',
  //   },
  // ],
};