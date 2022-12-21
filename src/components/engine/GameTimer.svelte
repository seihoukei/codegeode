<script>
    import {onDestroy} from "svelte"

    export let state

    let last = performance.now()

    function advance() {
        const now = performance.now()
        const delta = now - last

        state.advance(delta)

        last = now
        state = state   //trigger an update
    }

    const interval = setInterval(advance, 16)

    onDestroy(() => clearInterval(interval))
</script>
