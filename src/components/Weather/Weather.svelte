<script>
    import {fade} from 'svelte/transition';
    import {onMount} from "svelte";
    import { visible, temperature, temperatureUnit, state } from './WeatherStore.js';


    let currentTemperatureUnit = 0;
    const toggleTemperatureUnit = () => {
        currentTemperatureUnit = currentTemperatureUnit === 0 ? 1 : 0;
        temperatureUnit.set(currentTemperatureUnit);
    }
</script>

<style>
    h4 {
        cursor: default;
    }

    img {
        width: 1.5rem;
    }
</style>


{#if $visible}
    <h4 transition:fade="{{ duration: 300 }}" on:click={toggleTemperatureUnit}>
		{$temperature.payload}
        <small>&#176;{$temperature.unit}</small>
        <img src={$state.image} alt={$state.alt}>
    </h4>
{/if}
