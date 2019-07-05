<script>
    import {fly} from 'svelte/transition';
    import Options from "./Options.svelte";
    import Column from "./Column.svelte";
    import Quote from "../CustomBlocks/Quote.svelte";
    import Clock from "./Clock.svelte";
    import Weather from "./Weather.svelte";

    let options = false;
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
            {#if !options}
                <div class="horizontally-centered"
                     transition:fly="{{ y: 200, duration: 400 }}">
                    <div class="flr">
                        <div class="row col-12">
                            <Clock></Clock>
                        </div>
                        <div class="row col-12">
                            <Weather></Weather>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="col shadow pt-3 pr-3 pl-3 pb-2 bg-white rounded text-dark"
                     transition:fly="{{ y: 200, duration: 400 }}">
                    <Options></Options>
                </div>
            {/if}
        </Column>
    </div>
</div>
