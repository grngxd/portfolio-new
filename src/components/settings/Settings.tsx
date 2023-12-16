import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export default component$((props: QwikIntrinsicElements['svg']) => {
    return (
        <div {...props}>
            settings page
        </div>
    )
})