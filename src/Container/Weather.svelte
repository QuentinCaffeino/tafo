<script>
    import {fade} from 'svelte/transition';
    import {onMount} from "svelte";

    /**
     * Applies 'Access-Control-Allow-Origin: *' on all requests
     * @type {string}
     */
    const proxy = 'https://cors-anywhere.herokuapp.com/';


    let visible = false;

    let temperature = 0.0;

    let stateImage = '';


    const _fetch = async (url) => {
        const response = await fetch(url);
        return await response.json();
    };


    const getSearchApi = (lat, long) => {
        return `${proxy}https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;
    };

    const searchClosestCity = async (lat, long) => {
        const data = await _fetch(getSearchApi(lat, long));

        if (Array.isArray(data) && data.length) {
            return data[0];
        }
    };


    const getLatestWeatherDataByWoeidApi = (woeid) => {
        const date = new Date;
        return `${proxy}https://www.metaweather.com/api/location/${woeid}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`
    };

    const getLatestWeatherDataByWoeid = async (woeid) => {
        const data = await _fetch(getLatestWeatherDataByWoeidApi(woeid));

        if (Array.isArray(data) && data.length) {
            return data[0];
        }
    };


    const updateStateImage = (state) => {
        stateImage = `https://www.metaweather.com/static/img/weather/${state}.svg`;
    };


    onMount(async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const city = await searchClosestCity(position.coords.latitude, position.coords.longitude);

                if (city.hasOwnProperty('woeid')) {
                    const data = await getLatestWeatherDataByWoeid(city.woeid);

                    if (data.hasOwnProperty('the_temp')) {
                        temperature = Math.round(data.the_temp);
                    }

                    if (data.hasOwnProperty('weather_state_abbr')) {
                        updateStateImage(data.weather_state_abbr);
                    }

                    visible = !visible;
                }
            });
        } else {
            console.info('Geolocation API is disabled or isn\'t supported. No weather then. :(');
        }
    });
</script>

<style>
    img {
        width: 1.5rem;
    }
</style>


{#if visible}
    <h4 transition:fade="{{ duration: 300 }}">
        {temperature}
        <small>&#176;&#67;</small>
        <img src={stateImage} alt="">
    </h4>
{/if}
