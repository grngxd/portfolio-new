import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <div class="dark:bg-gray-950 dark:text-white flex justify-center items-center w-full h-screen absolute">
            <div class="flex gap-6 w-[40%] h-36">
                <img src="https://avatars.githubusercontent.com/u/36968271" width="460" height="460" alt="GitHub Avatar" class="rounded-lg full hidden md:block w-36 h-36" />
                <div class="flex flex-col justify-center gap-4">
                    <h1 class="text-4xl font-bold font-krona">grunge.</h1>
                    <p class="font-sora text-sm dark:opacity-100 text-[#888888] dark:text-[#CCCCCC] h-min"><span class="!text-black dark:!text-white">he/him. </span>Just your average kid making stuff with your favorite frameworks and libraries. Check out more stuff about me &amp; my socials below.</p>
                </div>
            </div>
        </div>
    )
})