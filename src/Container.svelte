<script>
    import Column from "./Column/Column.svelte";
    import Quote from "./CustomBlocks/Quote.svelte";
    import Clock from "./Blocks/Clock.svelte";
    import Weather from "./Blocks/Weather.svelte";
</script>

<style>
    .container {
        position: relative;
        z-index: 1;
    }

    .horizontally-centered {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .flr {
        float: right;
        transform: translateY(-50%);
    }
</style>


<div class="container">
    <div class="row">
        <Column>
            <div class="row horizontally-centered">
                <Quote></Quote>
            </div>
        </Column>

        <Column>
            <div class="horizontally-centered">
                <div class="flr">
                    <div class="row col-12">
                        <Clock></Clock>
                    </div>
                    <div class="row col-12">
                        <Weather></Weather>
                    </div>
                </div>
            </div>
        </Column>
    </div>
</div>
