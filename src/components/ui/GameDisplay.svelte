<script>
    import StepsDisplay from "./StepsDisplay.svelte"
    import WorldDisplay from "./WorldDisplay.svelte"
    import GameControls from "./GameControls.svelte"
    import WorldEnd from "./WorldEnd.svelte"
    import MenuDialog from "./dialogs/MenuDialog.svelte"
    import BlueprintsDialog from "./dialogs/BlueprintsDialog.svelte"
    import UpgradesDialog from "./dialogs/UpgradesDialog.svelte"
    import WORLD_COLORS from "../../data/world-colors.js"

    export let state
</script>

<div class="container">
    <div class="header">
        <GameControls bind:state />
        <StepsDisplay bind:state />
    </div>

    {#if state.dialog === "menu"}
        <MenuDialog bind:state/>
    {:else if state.dialog === "blueprints"}
        <BlueprintsDialog bind:state/>
    {:else if state.dialog === "upgrades"}
        <UpgradesDialog bind:state/>
    {:else}
        {#if !state.finished()}
            <div class="worlds">
                {#each state.worlds as world, id}
                    <WorldDisplay bind:world
                                  state={state}
                                  title={state.worlds.length > 1 ? `W\no\nr\nl\nd\n${id}` : ""}
                                  color={state.worlds.length > 1 ? WORLD_COLORS[id] : "#111111"}/>
                {/each}
            </div>
        {:else}
            <WorldEnd bind:state />
        {/if}
    {/if}
</div>

<style>
    div.container {
        display : flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
    }
    div.header {
        display : flex;
        flex-direction: column;
        flex-shrink: 0;
    }
    div.worlds {
        overflow: auto;
        flex-grow: 1;
    }
</style>
