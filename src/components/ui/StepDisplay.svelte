<script>
    export let step

</script>

<div class="container" class:breakpoint={step.breakpoint} style="--progress:{(step.progress*100 - 100)}%" on:click>
    <div class="progress"></div>
    <div class="index">
        {step.index + 1}
    </div>
</div>

<style>
    div.container {
        position : relative;
        display : flex;
        align-items: start;
        justify-content: center;
        flex : 1 1 0;
        padding : 0 2px;
        cursor: pointer;
        overflow : hidden;
        background-color: black;
    }

    div.progress {
        width: 100%;
        height: 100%;
        position : absolute;
        top : 0;
        background-color: green;
        left : var(--progress);
        z-index: 1;
    }

    div.container.breakpoint {
        background-color: maroon;
    }

    div.container.breakpoint div.progress {
        background-color: olive;
    }

    div.index {
        z-index: 3;
    }
</style>
