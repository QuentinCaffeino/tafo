<script>
    import Column from "./Column/Column.svelte";
    import Quote from "./Blocks/Quote.svelte";
    import Clock from "./Blocks/Clock.svelte";
    import Weather from "./Blocks/Weather.svelte";
</script>

<style>
    .container {
        position: relative;
        z-index: 1;
    }

    .horizontally-centered {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .float-right {
        right: 0;
    }
</style>


<div class="container">
    <div class="row">
        <Column>
            <div class="horizontally-centered">
                <Quote></Quote>
            </div>
        </Column>
        <Column>
            <div class="horizontally-centered float-right">
                <Clock></Clock>
                <Weather></Weather>
            </div>
        </Column>
    </div>
</div>
