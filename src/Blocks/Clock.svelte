<script>
    import format from "date-fns/format";


    let hours = '00';
    let minutes = '00';


    let date;

    function updateMinutes() {
        date = new Date();

        minutes = format(date, "mm");

        setTimeout(updateMinutes, 1000);
    }

    function updateHours() {
        hours = format(date, "hh");

        setTimeout(updateHours, 5000);
    }

    updateMinutes();
    updateHours();
</script>

<style>
    .clock {
    }
</style>


<div class="clock">
    <h1 class="display-1">{hours}:{minutes}</h1>
</div>
