<script>
    export let state

    let showImports = false
    let line = ""

    function close() {
        state.setDialog("")
        state = state
    }

    function resetLoop() {
        state.resetLoop()
        state.setDialog("")
        state = state
    }

    function saveGame() {
        state.saveState()
        state.saveState("codegeode_autosave")
        state.setDialog("")
        state = state
    }

    function loadGame() {
        state.loadState()
        state = state
    }

    function resetGame() {
        state.hardReset()
        state.setDialog("")
        state = state
    }

    function showImport() {
        showImports = true
        line = state.save()
    }

    function hideImport() {
        showImports = false
    }

    function loadImport() {
        state.load(line)
        state = state
    }

</script>

<div class="container">
    {#if showImports}
        <div class="title">Game state</div>
        <textarea bind:value={line}></textarea>
        <div class="buttons">
            <button on:click={loadImport}>Import state</button>
            <button on:click={hideImport}>Back to menu</button>
        </div>
    {:else}
        <div class="title">Game menu</div>

        <div class="menu">
            <button on:click={resetLoop}>Reset loop</button>
            <div class="split"></div>
            <button on:click={saveGame}>Save game</button>
            <button on:click={loadGame}>Load game</button>
            <button on:click={showImport}>Export/Import</button>
            <div class="split"></div>
            <button on:click={resetGame} class="danger">Reset game</button>
            <div class="split"></div>
            <button on:click={close}>Close</button>
        </div>
    {/if}
<!--
    <textarea>{
        state.blueprints
            .map(({data:d}, i) => `Blueprint ${i+1}: Each ore robot costs ${d[0]} ore. Each clay robot costs ${d[1]} ore. Each obsidian robot costs ${d[2]} ore and ${d[3]} clay. Each geode robot costs ${d[4]} ore and ${d[5]} obsidian.`)
            .join("\n")
    }</textarea>
-->
</div>

<style>
div.title {
    font-size: 150%;
    padding: 0 0 20px;
}

div.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden auto;
    padding: 20px 0;
}

div.menu {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
    font: inherit;
    padding: 5px;
    width: 200px;
    cursor: pointer;
}

div.split {
    height : 20px;
}

.danger {
    color:red;
}

div.buttons {
    display: flex;
    flex-direction: row;
    column-gap: 30px;
    align-items: center;
    justify-content: center;
}

textarea {
    width : 80%;
    height : 200px;
    margin : 0 0 30px;
}
</style>
