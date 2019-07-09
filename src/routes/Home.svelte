<script>
    import Clock from "../components/Clock/Clock.svelte";
    import Weather from "../components/Weather/Weather.svelte";
</script>

<style>
    .horizontally-centered {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
</style>


<div class="row horizontally-centered">
    <div class="row col-12">
        <Clock></Clock>
    </div>
    <div class="row col-12">
        <Weather></Weather>
    </div>
</div>
