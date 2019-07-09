<script>
    import format from "date-fns/format";
    import { time } from './ClockStore.js';
    

    let twelveHourFormat = true;
    $: formatter = new Intl.DateTimeFormat('en', {
        hour12: twelveHourFormat,
        hour: 'numeric',
        minute: '2-digit'
    });

    const toggleTwelveHourFormat = () => {
        twelveHourFormat = !twelveHourFormat
    };
</script>

<style>
    .clock {
        cursor: default;
    }
</style>


<div class="clock" on:click={toggleTwelveHourFormat}>
    <h1 class="display-1">{formatter.format($time)}</h1>
</div>
