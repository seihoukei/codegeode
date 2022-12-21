<script>
    import RESOURCES from "../../data/resources.js"
    import ResourceDisplay from "./ResourceDisplay.svelte"
    import PlanDisplay from "./PlanDisplay.svelte"

    export let state
    export let world
    export let title = ""
    export let color = "#111111"

    function choose(next) {
        world.setNext(next)
        world.usePlan = false
    }
</script>

{#if world}
<div class="container" style="--color:{color}">
    <div class="resources">
        {#if title !== ""}
            <div class="title">{title}</div>
        {/if}
        {#each RESOURCES as resource, id}
            <ResourceDisplay resource={resource}
                             id={id}
                             world={world}
                             state={state}
                             on:choose={() => choose(id)}
            />
        {/each}
    </div>
    {#if state.rules.canUsePlan}
        <PlanDisplay bind:world state={state}/>
    {/if}
</div>
    {/if}

<style>
    div.container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        background-color: var(--color);
        padding : 5px 0;
        margin : 5px 0;
        row-gap:5px;
    }

    div.resources {
        position : relative;
        display : flex;
        flex-direction: row;
        align-items: stretch;
        column-gap:5px;
        justify-content: center;
    }

    div.title {
        display : flex;
        align-items: center;
        justify-content: center;
        font-size: 150%;
        line-height : 120%;
        text-align: center;
        white-space: pre;
    }
</style>
