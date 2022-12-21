<script>
    import WORLD_COLORS from "../../../data/world-colors.js"

    export let state

    function close() {
        state.setDialog("")
        state = state
    }

    function setBlueprint(world, blueprint) {
        if (state.finished()) {
            world.setBlueprint(blueprint)
        } else {
            world.nextBlueprint = blueprint
        }
        state = state
    }

</script>

<div class="container">
    <div class="title">Blueprints</div>

    Blueprints that are not locked and not used are rerolled at the end of the world.

    {#if !state.finished()}
        Changes will take effect since next world.
    {/if}

    <div class="blueprints">
        {#each state.blueprints as blueprint, id}
            <div class="blueprint">
                {#each state.worlds as world, id}
                    <div class="use"
                         style="--color: {WORLD_COLORS[id]}"
                         on:click={() => setBlueprint(world, blueprint)}
                    >{
                        world.blueprint === blueprint
                            ? "✓"
                            : world.nextBlueprint === blueprint
                                ? ">"
                                : " "
                    }</div>
                {/each}
                <div class="description">
                    <span class="icon res0"></span> {blueprint.data[0]},
                    <span class="icon res0"></span> {blueprint.data[1]},
                    <span class="icon res0"></span> {blueprint.data[2]}
                    <span class="icon res1"></span> {blueprint.data[3]},
                    <span class="icon res0"></span> {blueprint.data[4]}
                    <span class="icon res2"></span> {blueprint.data[5]}
                </div>
                <label>
                    <input type="checkbox"
                           bind:checked={blueprint.locked}>
                    Locked
                </label>
                <!--<button disabled={!!blueprint.locked}>Reroll</button>-->
            </div>
        {/each}
    </div>

    <div class="buttons">
        <button on:click={close}>Close</button>
    </div>

    <textarea>{
        state.blueprints
            .map(({data:d}, i) => `Blueprint ${i+1}: Each ore robot costs ${d[0]} ore. Each clay robot costs ${d[1]} ore. Each obsidian robot costs ${d[2]} ore and ${d[3]} clay. Each geode robot costs ${d[4]} ore and ${d[5]} obsidian.`)
            .join("\n")
        }</textarea>
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
        padding : 20px 0;
    }

    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        column-gap: 5px;
        font : inherit;
        padding : 5px;
        width : 200px;
        cursor : pointer;
    }

    div.blueprints {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        align-items: stretch;
        justify-content: center;
        padding : 20px 0;
    }

    div.blueprint {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: stretch;
        column-gap: 10px;
    }

    div.description {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 10px;
        padding : 0 20px;
        flex:1;
    }

    div.gap {
        flex : 1;
        min-width: 30px;
    }

    div.buttons {
        display: flex;
        flex-direction: row;
        column-gap: 20px;
    }

    span.icon {
        margin-right: -10px;
    }

    label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    div.use {
        width : 24px;
        height : 24px;
        background-color: var(--color);
        border: 1px solid #CCCCCC;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    textArea {
        width : 80%;
        height : 180px;
        margin : 20px 0 0;
    }
</style>
