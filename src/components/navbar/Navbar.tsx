import type { Component, Signal } from "@builder.io/qwik";
import { $, component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { SelectedPageCtx } from "~/routes/index";

import { BoxOutline, HomeOutline, PhoneOutline, UserOutline } from "../Icons";
import About from "../about/About";
import Contact from "../contact/Contact";
import Home from "../home/Home";
import Projects from "../projects/Projects";
import Settings from "../settings/Settings";

const icons : any = {
    "Home": HomeOutline,
    "About": UserOutline,
    "Projects": BoxOutline,
    "Contact": PhoneOutline,
};


const NavItem = component$((props : { text: string, component : any }) => {
    const Icon = icons[props.text];
    const selectedPage = useContext(SelectedPageCtx)

    return (
        <div class={"!z-[3] flex flex-row items-center justify-around select-none font-krona text-xs p-1 h-full text-center rounded-full writing-mode-vertical active:scale-90 hover:scale-115 duration-400 transition-all " + (selectedPage.value == props.component ? "dark:bg-white dark:text-gray-950 bg-gray-200 text-gray-950 scale-115" : "bg-transparent hover:dark:bg-white hover:text-gray-950 dark:text-white hover:bg-gray-200 :text-gray-950 text-gray-950 dark:hover:text-gray-950")} onMouseDown$={$(() => {
            console.log('NavItem clicked');
            selectedPage.value = props.component;
        })}>    
            {props.text}
            <Icon class="w-5 h-5 mx-auto" />
        </div>
    )
})

export default component$(() => { 
    const NavItems : Signal = useSignal([
        {
                text: "Home",
                component: Home,
            },
            {
                text: "About",
                component: About,
            },
            {
                text: "Projects",
                component: Projects,
            },
        {
            text: "Contact",
            component: Contact,
        },
    ])

    const selectedPage : Signal = useContext(SelectedPageCtx)

    useVisibleTask$(() => {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                // case "0":
                //     selectedPage.value = Settings;
                //     break;
                case "1":
                case "2":
                case "3":
                case "4":
                    selectedPage.value = NavItems.value[+e.key - 1].component;
                    break;
            }
        })
    })
   
    return (
        <div class="!z-[2] w-24 h-screen flex dark:bg-gray-950 flex-col p-4 py-10 items-center gap-8 hover:dark:bg-gray-900 hover:bg-gray-100 transition-colors duration-200 rounded-r-xls">
            <Avatar />

            {NavItems.value.map((item: { text: string; component: Component<{}>; }, index : number) => {

                return <NavItem key={index} text={item.text} component={item.component} />
            })}
        </div>
    );

})

const Avatar = component$(() => {
    const selectedPage : Signal = useContext(SelectedPageCtx)
    return (
        <div class={"z-[3] rounded-xl relative bg-cover bg-center aspect-square overflow-clip group active:translate-y-1 duration-200 transition-all " + (selectedPage.value == Settings ? "scale-115" : "")}
        onMouseDown$={$(() => {
            console.log('Avatar clicked');

            const settings = JSON.parse(
                localStorage.getItem("settings") || "{}"
            );
            
            settings["dark"] = !settings["dark"];

            localStorage.setItem("settings", JSON.stringify(settings));

            window.document.body.classList.toggle("dark");
        })}>
            <img src="https://avatars.githubusercontent.com/u/36968271" width="460" height="460" alt="GitHub Avatar" class="group-hover:scale-110 duration-400 transiton-all group-hover:blur-[2px] ease-out" />
            <div class="dark:bg-gray-950 bg-white dark:text-white text-gray-950 bg-opacity-0 opacity-0 group-hover:bg-opacity-60 group-hover:opacity-100 transition-all duration-400 h-full w-full absolute inset-0 flex justify-center items-center select-none">
                <p class="font-krona text-xs">grng</p>
            </div>
        </div>
    )
})