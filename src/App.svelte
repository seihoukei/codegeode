<script>
    import GameDisplay from "./components/ui/GameDisplay.svelte"
    import GameTimer from "./components/engine/GameTimer.svelte"
    import GameState from "./scripts/game-state.js"

    let state = new GameState()

    state.loadState("codegeode_autosave")

</script>

<main>
    <GameDisplay bind:state/>
</main>

{#if state.running()}
    <GameTimer bind:state />
{/if}

<style>
</style>
