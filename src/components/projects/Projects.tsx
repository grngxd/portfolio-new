import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
    const repos = useSignal([]);

    useVisibleTask$(({ track }) => {
        track(() => repos.value);
        console.log("repos.value", repos.value);
    })

    useVisibleTask$(async () => {
        const fetchRepos = async () => {
            await fetch("/api/github/repos")
            .then((res) => res.json())
            .then((data) => repos.value = data)
        }

        await fetchRepos();
    })
    return (
        <div class="dark:bg-gray-950 dark:text-white flex w-full h-screen absolute">
            {repos.value.map((repo : any) => {
                return (
                    <div key={repo.id}>
                        {repo.name}
                    </div>
                )
            })}
        </div>
    )
})