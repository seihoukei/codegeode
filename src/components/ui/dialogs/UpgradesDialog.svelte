<script>
    import PURCHASES from "../../../data/purchases.js"

    export let state

    function close() {
        state.setDialog("")
        state = state
    }

    function purchase(id) {
        console.log(id, price(id), canBuy(id))
        if (canBuy(id)) {
            state.resources.minerals -= price(id)
            state.purchases[id] = (state.purchases[id] ?? 0) + 1
        }
        state = state
    }

    function canSee(id) {
        const data = PURCHASES[id]

        if (data.requires) {
            for (let [id, value] of Object.entries(data.requires))
                if ((state.purchases[id] ?? 0) < value)
                    return false
        }

        return true
    }

    function maxed(id) {
        const data = PURCHASES[id]

        if ((state.purchases[id] ?? 0) >= (data.max ?? 1))
            return true

        return false
    }

    function canBuy(id) {
        const data = PURCHASES[id]

        if (state.resources.minerals < price(id))
            return false

        if (maxed(id))
            return false

        return true
    }

    function price(id) {
        const data = PURCHASES[id]
        return data.cost * (data.scale ?? 1) ** (state.purchases[id] ?? 0)
    }
</script>

<div class="container">
    <div class="title">Upgrades</div>

    <label>
        <input type="checkbox"
               bind:checked={state.hideMaxed}>
        Hide maxed and bought
    </label>

    {#if !state.finished()}
        Changes will take effect since next world.
    {/if}

    <div class="have">You have {state.resources.minerals.toFixed(2)} <span class="icon res4"></span></div>

    <div class="upgrades">
        {#each Object.entries(PURCHASES) as [id, data]}
            {#if canSee(id) && (!state.hideMaxed || !maxed(id))}
                <div class="upgrade">
                    <div class="item">
                        <div class="name">{data.name}</div>
                        <div class="description">{data.description}</div>
                    </div>
                    <div class="gap"></div>
                    {#if data.max > 1}
                        {state.purchases[id] ?? 0}/{data.max ?? 1}
                    {/if}
                    <button on:click={() => purchase(id)} disabled={!canBuy(id, state)}>
                        {#if maxed(id, state)}
                            {data.max > 1 ? "MAXED" : "BOUGHT"}
                        {:else}
                            <span class="icon res4"></span> {price(id, state).toFixed(2)}
                        {/if}
                    </button>
                </div>
            {/if}
        {/each}
    </div>

    <button on:click={close}>Close</button>
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

    div.upgrades {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        align-items: stretch;
        justify-content: center;
        padding : 20px 0;
    }

    div.upgrade {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: stretch;
        column-gap: 5px;
    }
    div.gap {
        flex : 1;
        min-width: 30px;
    }

    div.item {
        display: flex;
        flex-direction: column;
    }

    div.name {
        padding : 0;
        line-height : 100%;
    }

    div.description {
        font-size: 75%;
        line-height: 100%;
    }

    label {
        padding: 0 0 10px;
    }
</style>
