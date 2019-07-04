<script>
    import {onMount} from "svelte";

    /**
     * Applies 'Access-Control-Allow-Origin: *' on all requests
     * @type {string}
     */
    const proxy = 'https://cors-anywhere.herokuapp.com/';


    let temperature = 0.0;


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
        return `${proxy}https://www.metaweather.com/api/location/${woeid}/2019/7/2/`
    };

    const getLatestWeatherDataByWoeid = async (woeid) => {
        const data = await _fetch(getLatestWeatherDataByWoeidApi(woeid));

        if (Array.isArray(data) && data.length) {
            return data[0];
        }
    };


    onMount(async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const city = await searchClosestCity(position.coords.latitude, position.coords.longitude);

                if (city.hasOwnProperty('woeid')) {
                    const data = await getLatestWeatherDataByWoeid(city.woeid);

                    if (data.hasOwnProperty('the_temp')) {
                        temperature = data.the_temp;
                    }
                }
            });
        } else {
            console.info('Geolocation API is disabled or isn\'t supported. No weather then. :(');
        }
    });
</script>


<h4>{temperature}</h4>
