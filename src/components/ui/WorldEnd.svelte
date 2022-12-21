<script>
    export let state

    function showPurchases() {
        state.setDialog("upgrades")
        state = state
    }

    function showBlueprints() {
        state.setDialog("blueprints")
        state = state
    }

    function reset() {
        state.reset()
        state = state
    }

</script>

<div class="container">
    <div class="title"> The world has ended. </div>

    {#if state.end.minerals}
        <div class="gains">
            <div>You got 1 <span class="icon res4"></span> from it.</div>
            <div>You also got {state.end.geodes} x {state.rules.geodeMulti.toFixed(2)} = {(state.end.minerals - 1).toFixed(2)} <span class="icon res4"></span> from {state.end.geodes} <span class="icon res3"></span></div>
            <div>You have {state.resources.minerals.toFixed(2)} <span class="icon res4"></span></div>
            <button on:click={showPurchases}>Buy upgrades</button>
        </div>
    {/if}

    {#if state.end.energy}
        <div class="gains">
            <div>You got {state.end.energy} <span class="icon res5"></span></div>
            <div>It's useless.</div>
        </div>
    {/if}

    {#if state.end.blueprints}
        <div class="gains">
            <div>{state.end.blueprints} {state.end.blueprints === 1 ? "blueprint was" : "blueprints were"} rerolled!</div>
            <button on:click={showBlueprints}>Manage blueprints</button>
        </div>
    {/if}

    {#if state.finished()}
        <div class="buttons">
            <button on:click={reset}>Turn back time</button>
        </div>
    {/if}


</div>

<style>
    div.container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: auto;
    }

    div.title {
        font-size: 200%;
        padding: 50px 0;
    }

    div.gains {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding : 0 0 40px;
        row-gap : 5px;
    }

    div.gains div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        column-gap: 5px;
    }

    div.buttons {
        display: flex;
        flex-direction: row;
        padding: 20px 0 0;
        font-size : 120%;
    }

    button {
        font: inherit;
        padding: 5px 20px;
        cursor: pointer;
    }
</style>
