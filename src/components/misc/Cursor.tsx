import { component$, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
    useVisibleTask$(() => {
        const cursor : Element | any = document.querySelector('#cursor');
        document.body.classList.add(
            'overflow-hidden',
            'cursor-none'
        );

        cursor!.style.transform = 'translate(-50%, -50%)';
        cursor!.style.transition = 'left 0ms ease-out, top 0ms ease-out'; // Add transition to left and top properties

        document.addEventListener('mousemove', (e) => {
            e.preventDefault();
            cursor!.style.left = `${e.clientX}px`;
            cursor!.style.top = `${e.clientY}px`;

            let x = e.clientX / window.innerWidth
            let y = e.clientY / window.innerHeight

            x = Math.round(x * 100) / 100
            y = Math.round(y * 100) / 100

            if ((x == 0 || x == 1) || (y == 0 || y == 1)) cursor!.style.opacity = '0';
            else cursor!.style.opacity = '1';        
        })

        // on click, scale up to 1.5x and reduce opacity to 0.5 with 200ms transition
        document.addEventListener('mousedown', (e) => {
            e.preventDefault();
            cursor!.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor!.style.transition = 'transform 150ms ease-out';  
        })

        // on release, scale down to 1x and increase opacity to 1 with 200ms transition
        document.addEventListener('mouseup', (e) => {
            e.preventDefault();
            cursor!.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor!.style.transition = 'transform 150ms ease-out';  
        })

        cursor.classList.remove('invisible');
    })
    return (
        <div class={`invisible absolute z-[999999999] w-8 h-8 rounded-full backdrop-invert transition-all duration-0 pointer-events-none`} id="cursor"/>
    )
})