<script>
    export let state

    function next() {
        state.unpause()
        state = state
    }

    function toggleAuto() {
        state.autoStep = !state.autoStep
        if (state.autoStep) next()
    }

    function showPurchases() {
        state.setDialog("upgrades")
        state = state
    }

    function showBlueprints() {
        state.setDialog("blueprints")
        state = state
    }

    function showMenu() {
        state.setDialog("menu")
        state = state
    }
</script>

<div class="container">
    <button on:click={next} disabled={state.running() || state.finished()}>Step</button>
    {#if state.rules.canAutoStep}
        <button on:click={toggleAuto} disabled={state.finished()}>{state.autoStep?"Pause":"Run"}</button>
    {/if}
    Steps: {state.step}/{state.rules.steps}
    {#if state.rules.canAutoReset}
        <label>
            <input type="checkbox" bind:checked={state.autoReset}>
            Auto-reset
        </label>
    {/if}
    <div class="pad"></div>
    {#if state.end.minerals}
        <div class="resource"><span class="icon res4"></span>{state.resources.minerals.toFixed(2)}</div>
        {#if state.end.energy}
            <div class="resource"><span class="icon res5"></span>{state.resources.energy.toFixed(2)}</div>
        {/if}
        <button on:click={showPurchases}>Upgrades</button>
        <button on:click={showBlueprints}>Blueprints</button>
    {/if}
    <button on:click={showMenu}>Menu</button>
</div>

<style>
    div.container {
        display : flex;
        flex-direction: row;
        column-gap : 5px;
        padding : 5px;
    }

    button {
        cursor: pointer;
        min-width : 70px;
        font-family: inherit;
        font-size: 80%;
    }
    div.pad {
        flex : 1;
    }

    div.resource {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        column-gap: 5px;
    }

    label {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        padding: 0 10px;
        column-gap : 3px;
    }
</style>
