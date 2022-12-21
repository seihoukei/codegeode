<script>
    import StepDisplay from "./StepDisplay.svelte"

    export let state

    $: steps = []
    $: updateSteps(state)

    function updateSteps(state) {
        steps.length = state.rules.steps
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i] = steps[i] ?? {}
            step.index = i
            step.complete = step.index < state.step
            if (step.complete)
                step.progress = 1
            else if (step.index === state.step)
                step.progress = state.stepProgress
            else
                step.progress = 0

            step.breakpoint = !!state.breakpoints[step.index]
        }
        steps = steps
    }

    function toggleBreakpoint(step) {
        if(!state.rules.canBreakpoint)
            return
        state.toggleBreakpoint(step)
        state = state
    }
</script>

<div class="container">
    {#each steps as step, id}
        <StepDisplay step={step} on:click={() => toggleBreakpoint(id)} />
    {/each}
</div>

<style>
    div.container {
        display : flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size : small;
        column-gap : 2px;
    }
</style>
