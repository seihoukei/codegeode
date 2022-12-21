<script>
    export let state
    export let world

    let edit = false
    let line = ""

    $: updatePlan(state)

    function updatePlan() {
        if (world.plan.length < state.rules.steps)
            for (let i = 0; i < state.rules.steps; i++)
                world.plan[i] ??= world.plan[i-1] ?? 0
    }

    function change(id) {
        world.setPlanStep(id, ((world.plan[id] ?? 0) + 1) % 4)
        world = world
    }

    function startEdit() {
        edit = true
        line = world.plan.join``
    }

    function cancelEdit() {
        edit = false
    }

    function saveEdit() {
        edit = false
        const inputs = line.match(/\d/g).map(Number).filter(x => x < 4).slice(0, )
        inputs.forEach((x, i) => world.setPlanStep(i, x))
        world.usePlan = true
    }
</script>

<div class="container">
    {#if edit}
        <input class="line" bind:value={line}>
        <button on:click={saveEdit}>Save</button>
        <button on:click={cancelEdit}>Cancel</button>
    {:else}
        <label>
            <input type="checkbox" bind:checked={world.usePlan}>
            Use plan
        </label>
        {#each world.plan as item, id}
            <div class="item"
                 class:current={world.step === id}
                 class:next={!world.betweenSteps && world.step + 1 === id}
                 on:click={() => change(id)}>
                <span class="icon res{item}">{id+1}</span>
            </div>
        {/each}
        <button on:click={startEdit}>Edit</button>
    {/if}
</div>

<style>
    div.container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        width : 90%;
        column-gap: 2px;
        margin : auto;
    }
    span.icon {
        font-size: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.item {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #050505;
        flex : 1;
        padding : 5px 0;
        cursor: pointer;
    }

    div.item.current {
        background-color: #222222;
    }

    div.item.next {
        background-color: #333333;
    }

    label {
        font-size: 75%;
        line-height: 24px;
        background-color: #050505;
        padding : 5px 10px;
        white-space: nowrap;
    }

    button {
        height : 32px;
        padding : 0 10px;
        font : inherit;
        font-size: 75%;
        cursor: pointer;
    }

    input.line {
        flex:1;
        height: 24px;
        font:inherit;

    }

</style>
