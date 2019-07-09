<script>
    import format from "date-fns/format";
    import {time, twelveHourFormatToggle, formatter} from './ClockStore.js';
    

    let _twelveHourFormat = true;
    const toggleTwelveHourFormat = () => {
        _twelveHourFormat = !_twelveHourFormat
        twelveHourFormatToggle.set(_twelveHourFormat)
    };
</script>

<style>
    .clock {
        cursor: default;
    }
</style>


<div class="clock" on:click={toggleTwelveHourFormat}>
    <h1 class="display-1">{$formatter.format($time)}</h1>
</div>
