<script>
    import RESOURCES, {RESOURCE_NAMES} from "../../data/resources.js"
    import {createEventDispatcher} from "svelte"

    export let state
    export let world
    export let id
    export let resource

    $: amount= world.resources[resource]
    $: robots= world.robots[resource]
    $: usage=world.betweenSteps ? world.costs[RESOURCES[world.current]]?.[resource] ?? 0 : 0
    $: next=world.next === id
    $: current=world.current === id
    $: costs=world.costs[resource]
    $: resources=Object.entries(world.resources).map(([name, value]) => [value, world.robots[name], value + world.robots[name]])
    $: betweenSteps=world.betweenSteps

    export let amount
    export let robots
    export let usage = 0
    export let next = false
    export let current = false
    export let costs
    export let resources
    export let betweenSteps

    const name = RESOURCE_NAMES[id]
    const dispatch = createEventDispatcher()

    function choose() {
        dispatch("choose")
    }

    //TODO: clean this mess, fall back to world + id
</script>

<div class="container" class:next={next} style="--progress: {100*state.stepProgress - 100}%" on:click={choose}>
    <div class="line"><span class="icon res{id}"> </span> {name} <span class="icon res{id}"> </span>    </div>
    <div class="big line">
        {#if robots}
            <div class="progress"></div>
        {/if}
        <span>{amount}</span>
        {#if robots || usage}
            <span class="production">({#if usage}-{usage}{/if}{#if robots}+{robots}{/if})</span>
        {/if}
    </div>

    <div class="robots"><div class="line">Robots</div>
        <div class="big line">
            {#if current}
                <div class="progress"></div>
            {/if}
            <span>{robots}</span>
            {#if current}
                <span class="production">(+1)</span>
            {/if}
        </div>
    </div>
    <div class="cost">
        <div class="line">Build next</div>
        {#each Object.entries(costs) as [resource, value]}
            {@const id = RESOURCES.indexOf(resource)}
            {#if betweenSteps}
                <div class="condensed line" class:expensive={(resources[id]?.[0] ?? 0) < value}><span class="icon res{id}"> </span>{resources[id]?.[0] ?? 0}/{value}</div>
            {:else}
                <div class="condensed line" class:expensive={(resources[id]?.[2] ?? 0) < value}><span class="icon res{id}"> </span>{resources[id]?.[0] ?? 0}{#if resources[id]?.[1]}<span class="production">(+{resources[id][1]})</span>{/if}/{value}</div>
            {/if}
        {/each}
    </div>
</div>

<style>
    div.container {
        display : flex;
        flex-direction: column;
        padding : 5px;
        width : 20%;
        align-items: center;
        justify-content: flex-start;
        background-color: black;
        cursor: pointer;

        position: relative;
        overflow: hidden;
    }

    div.container.next {
        border : 5px solid #666666;
        padding: 0;
    }

    div.line {
        display : flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        column-gap:10px;
        z-index: 3;
    }

    span.production {
        font-size: 50%;
    }

    div.robots {
        display : flex;
        flex-direction: column;
        margin: 10px 0;
        width : 100%;
        z-index: 3;
    }

    div.expensive {
        color : firebrick;
    }

    div.big {
        position : relative;
        font-size : 200%;
        width : 100%;
        padding: 15px 0;
        overflow: hidden;
        background: linear-gradient(to bottom, #111111, black 50%, #111111);
    }

    div.big * {
        z-index: 3;
    }

    div.condensed {
        column-gap: 0;
    }

    div.progress {
        position: absolute;
        width : 100%;
        height : 100%;
        left : var(--progress);
        background: linear-gradient(to bottom, #222222, #333333 50%, #222222);
        z-index: 1;
    }

    div.cost {
        z-index: 3;
    }
</style>
